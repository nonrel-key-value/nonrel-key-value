##############################################################
# DynamoDB details
##############################################################
resource "aws_secretsmanager_secret" "dynamo_key" {
  name = "dynamo_key"
}

resource "aws_secretsmanager_secret_version" "dynamo_key" {
  secret_id     = aws_secretsmanager_secret.dynamo_key.id
  secret_string = "dummy"
}

data "aws_secretsmanager_secret_version" "dynamo_key" {
  secret_id  = aws_secretsmanager_secret.dynamo_key.arn
  depends_on = [aws_secretsmanager_secret_version.dynamo_key]
}

resource "aws_secretsmanager_secret" "dynamo_secret" {
  name = "dynamo_secret"
}

resource "aws_secretsmanager_secret_version" "dynamo_secret" {
  secret_id     = aws_secretsmanager_secret.dynamo_secret.id
  secret_string = "dummy"
}

data "aws_secretsmanager_secret_version" "dynamo_secret" {
  secret_id  = aws_secretsmanager_secret.dynamo_secret.arn
  depends_on = [aws_secretsmanager_secret_version.dynamo_secret]
}

##############################################################
# EC2 role
##############################################################
resource "aws_iam_role" "beanstalk_ec2" {
  assume_role_policy    = "{\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"ec2.amazonaws.com\"}}],\"Version\":\"2012-10-17\"}"
  description           = "Allows EC2 instances to call AWS services on your behalf."
  force_detach_policies = false
  managed_policy_arns   = ["arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker", "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier", "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier", "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"]
  max_session_duration  = 3600
  name                  = "aws-elasticbeanstalk-ec2"
  path                  = "/"
}

resource "aws_iam_instance_profile" "beanstalk_ec2" {
  name = "aws-elasticbeanstalk-ec2-profile"
  role = aws_iam_role.beanstalk_ec2.name
}

##############################################################
# Deployment and deployment bucket
##############################################################
resource "aws_s3_bucket" "backend_beanstalk" {
  bucket        = "${var.account_id}-deploy-bucket"
  force_destroy = true
}

resource "aws_s3_object" "backend_beanstalk_default" {
  bucket = aws_s3_bucket.backend_beanstalk.id
  key    = "default_api.zip"
  source = "./DummyVersions/default_api.zip"
}

resource "aws_elastic_beanstalk_application_version" "default" {
  name         = "tf-test"
  application  = "api-app"
  description  = "application version created by terraform"
  bucket       = aws_s3_bucket.backend_beanstalk.id
  key          = aws_s3_object.backend_beanstalk_default.id
  force_delete = true
}

##############################################################
# Beanstalk stuff
##############################################################
resource "aws_elastic_beanstalk_application" "backend_beanstalk" {
  name        = "api-app"
  description = "App for API"
}

resource "aws_elastic_beanstalk_environment" "backend_beanstalk" {
  name                = "api-env"
  application         = aws_elastic_beanstalk_application.backend_beanstalk.name
  solution_stack_name = "64bit Windows Server 2022 v2.15.2 running IIS 10.0"
  tier                = "WebServer"
  version_label       = "tf-test"
  cname_prefix        = "karl-stuff"

  depends_on = [aws_elastic_beanstalk_application_version.default]

  lifecycle {
    ignore_changes = all
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = module.vpc.vpc_id
  }
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.beanstalk_ec2.name
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", module.vpc.public_subnets)
  }
  setting {
    namespace = "aws:ec2:instances"
    name      = "InstanceTypes"
    value     = "t3.micro"
  }
  setting {
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    name      = "SystemType"
    value     = "basic"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application"
    name      = "Application Healthcheck URL"
    value     = "/"
  }
  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "Timeout"
    value     = "60"
  }
  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "IgnoreHealthCheck"
    value     = "true"
  }
  setting {
    namespace = "aws:elasticbeanstalk:managedactions"
    name      = "ManagedActionsEnabled"
    value     = "false"
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "AssociatePublicIpAddress"
    value     = "true"
  }
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = 1
  }
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = 1
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "LoadBalanced"
  }
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "LoadBalancerType"
    value     = "network"
  }
  setting {
    namespace = "aws:elbv2:listener:default"
    name      = "ListenerEnabled"
    value     = "true"
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "ELBSubnets"
    value     = join(",", module.vpc.private_subnets)
  }
  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "Protocol"
    value     = "TCP"
  }
  setting {
    namespace = "aws:elb:healthcheck"
    name      = "Interval"
    value     = 10
  }
  setting {
    namespace = "aws:elb:healthcheck"
    name      = "Timeout"
    value     = 20
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DYNAMO_KEY"
    value     = data.aws_secretsmanager_secret_version.dynamo_key.secret_string
    resource  = ""
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DYNAMO_SECRET"
    value     = data.aws_secretsmanager_secret_version.dynamo_secret.secret_string
    resource  = ""
  }
}