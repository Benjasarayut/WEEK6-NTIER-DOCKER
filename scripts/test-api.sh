#!/bin/bash
echo "🧪 Testing API Endpoints..."
BASE_URL="https://localhost"
curl -k -s $BASE_URL/api/health | jq .
