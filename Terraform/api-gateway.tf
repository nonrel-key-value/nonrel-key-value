data "aws_lbs" "nlb" {
  depends_on = [ aws_elastic_beanstalk_environment.backend_beanstalk ]
}

data "aws_lb" "nlb" {
  arn = tolist(data.aws_lbs.nlb.arns)[0]
}

resource "aws_api_gateway_vpc_link" "nlb" {
  name        = "NLB"
  description = "VPC link to NLB"
  target_arns = [tolist(data.aws_lbs.nlb.arns)[0]]
}

resource "aws_acm_certificate" "beanstalk" {
  domain_name       = "api.${var.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

##############################################################
# Api gateway
##############################################################
resource "aws_api_gateway_domain_name" "api" {
  domain_name              = "api.${var.domain_name}"
  regional_certificate_arn = aws_acm_certificate.beanstalk.arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_rest_api" "api" {
  name = "api"
  body = jsonencode({
    "openapi" : "3.0.1",
    "info" : {
      "title" : "api",
      "version" : "1.0"
    },
    "servers" : [{
      "url" : "https://api.${var.domain_name}",
      "x-amazon-apigateway-endpoint-configuration" : {
        "disableExecuteApiEndpoint" : true
      }
    }],
    "paths" : {
      "/" : {
        "get" : {
          "x-amazon-apigateway-integration" : {
            "connectionId" : aws_api_gateway_vpc_link.nlb.id,
            "httpMethod" : "GET",
            "uri" : "http://${data.aws_lb.nlb.dns_name}",
            "passthroughBehavior" : "when_no_match",
            "connectionType" : "VPC_LINK",
            "type" : "http_proxy"
          }
        }
      },
      "/{proxy+}" : {
        "x-amazon-apigateway-any-method" : {
          "parameters" : [{
            "name" : "proxy",
            "in" : "path",
            "required" : true,
            "schema" : {
              "type" : "string"
            }
          }],
          "security" : [{
            "cognito" : []
          }],
          "x-amazon-apigateway-integration" : {
            "connectionId" : aws_api_gateway_vpc_link.nlb.id,
            "httpMethod" : "ANY",
            "uri" : "http://${data.aws_lb.nlb.dns_name}/{proxy}",
            "passthroughBehavior" : "when_no_match",
            "connectionType" : "VPC_LINK",
            "type" : "http_proxy",
            "requestParameters" : {
              "integration.request.path.proxy" : "method.request.path.proxy"
            }
          }
        }
      }
    },
    "components" : {
      "securitySchemes" : {
        "cognito" : {
          "type" : "apiKey",
          "name" : "Authorization",
          "in" : "header",
          "x-amazon-apigateway-authtype" : "cognito_user_pools",
          "x-amazon-apigateway-authorizer" : {
            "providerARNs" : [aws_cognito_user_pool.prd_pool.arn],
            "type" : "cognito_user_pools"
          }
        }
      }
    },
  })

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.api.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "api" {
  deployment_id = aws_api_gateway_deployment.api.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "api"
}

resource "aws_api_gateway_base_path_mapping" "api" {
  api_id      = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_stage.api.stage_name
  domain_name = aws_api_gateway_domain_name.api.domain_name
}
