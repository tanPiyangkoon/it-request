#!/bin/bash
# Build and push Docker images to registry

set -e

# Configuration
REGISTRY="ghcr.io/tanpiyangkoon"
APP_NAME="it-request"
VERSION=${1:-latest}

echo "🐳 Building and pushing Docker images for $APP_NAME:$VERSION"

# Build backend
echo "📦 Building backend..."
docker build -t ${REGISTRY}/${APP_NAME}-backend:${VERSION} \
  -f backend/Dockerfile \
  ./backend

echo "📦 Building frontend..."
docker build -t ${REGISTRY}/${APP_NAME}-frontend:${VERSION} \
  -f Dockerfile \
  .

# Push images
echo "🚀 Pushing images to registry..."
docker push ${REGISTRY}/${APP_NAME}-backend:${VERSION}
docker push ${REGISTRY}/${APP_NAME}-frontend:${VERSION}

echo "✅ Images pushed successfully!"
echo "   Backend:  ${REGISTRY}/${APP_NAME}-backend:${VERSION}"
echo "   Frontend: ${REGISTRY}/${APP_NAME}-frontend:${VERSION}"

# Update kustomization.yaml if version is not 'latest'
if [ "$VERSION" != "latest" ]; then
  echo "📝 Updating kustomization.yaml..."
  cd k8s/overlays/production
  kustomize edit set image \
    it-request-backend=${REGISTRY}/${APP_NAME}-backend:${VERSION}
  cd ../../..

  echo "✅ Don't forget to commit and push the changes!"
  echo "   git add k8s/overlays/production/kustomization.yaml"
  echo "   git commit -m 'chore: update image to ${VERSION}'"
  echo "   git push origin production"
fi
