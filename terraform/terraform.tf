provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

resource "google_container_cluster" "cluster-1" {
  provider = google-beta
  project = var.project_id
  name     = var.cluster_name
  location = var.zone

  initial_node_count       = 3

  node_config {
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }

  timeouts {
    create = "30m"
    update = "40m"
  }

  addons_config {
    istio_config {
      disabled = false
    }
  }

  release_channel {
    channel = "REGULAR"
  }
}