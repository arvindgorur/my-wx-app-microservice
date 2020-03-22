variable "project_id" {
  description = "Project ID"
}

variable "region" {
  description = "Default region for resources"
  default = "us-central1"
}


variable "zone" {
  description = "Default zone for resources"
  default = "us-central1-c"
}

variable "cluster_name" {
  description = "GKE cluster name"
  default = "cluster-1"
}
