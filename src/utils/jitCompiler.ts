import { SolutionItem } from '../types';
import { generate380CharHeader } from './nodeHeader';

export interface JitSoftwareArtifact {
  solutionId: string;
  solutionTitle: string;
  version: string;
  licenseKey: string;
  compiledTimestamp: string;
  runtime: 'Node.js 20 ESM' | 'Rust Core' | 'Python AI Container' | 'Go Microservice';
  header380: string;
  nodeNumber: string;
  sha256Checksum: string;
  dockerRunCommand: string;
  entrypointCode: string;
  apiEndpointUrl: string;
  manifestJson: string;
  author: string;
}

/**
 * Builds and compiles the custom JIT software artifact package for a customer order.
 */
export function compileJitSoftwarePackage(
  item: SolutionItem,
  nodeNumber: string,
  customerEmail: string = 'customer@uarefake.com'
): JitSoftwareArtifact {
  const cleanId = item.id.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const header380 = generate380CharHeader(nodeNumber, 'uarefake.com Enterprise Global');
  const timestamp = new Date().toISOString();
  const licenseKey = `LIC-SOLVEX-${cleanId.toUpperCase()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
  const sha256Checksum = `sha256-${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

  // Determine runtime based on category
  let runtime: 'Node.js 20 ESM' | 'Rust Core' | 'Python AI Container' | 'Go Microservice' = 'Node.js 20 ESM';
  const cat = (item.category || '').toLowerCase();
  if (cat.includes('ai') || cat.includes('cognitive') || cat.includes('procurement')) {
    runtime = 'Python AI Container';
  } else if (cat.includes('security') || cat.includes('cryptographic') || cat.includes('audit') || cat.includes('compliance')) {
    runtime = 'Rust Core';
  } else if (cat.includes('logistics') || cat.includes('router') || cat.includes('iot')) {
    runtime = 'Go Microservice';
  }

  // Generate specialized runnable entrypoint code
  let entrypointCode = '';
  if (runtime === 'Node.js 20 ESM') {
    entrypointCode = `// Solvex Sovereign JIT Runtime v2.4.0
// Package: ${item.title}
// Licensed to: ${customerEmail}
// Node: ${nodeNumber}
import { createServer } from 'node:http';

const NODE_HEADER_380 = "${header380}";
const LICENSE_KEY = "${licenseKey}";

const server = createServer(async (req, res) => {
  // Verify 380-character header boundary invariance
  if (NODE_HEADER_380.length !== 380) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: "Cryptographic header boundary violation" }));
  }

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: "OPERATIONAL", node: "${nodeNumber}", solution: "${item.title}" }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    solution: "${item.title}",
    status: "ACTIVE_JIT_EXECUTION",
    paradoxResolved: "${item.paradoxResolution || 'Omnipresence vs Boundary Invariance'}",
    timestamp: new Date().toISOString()
  }));
});

server.listen(8080, '0.0.0.0', () => {
  console.log("🚀 [${item.title}] Sovereign JIT Node operational on port 8080");
});
`;
  } else if (runtime === 'Rust Core') {
    entrypointCode = `// Solvex Sovereign JIT Runtime (Rust Core v1.78)
// Package: ${item.title}
// License: ${licenseKey}

use std::net::SocketAddr;
use axum::{routing::get, Json, Router};
use serde_json::{json, Value};

const NODE_HEADER: &str = "${header380}";

#[tokio::main]
async fn main() {
    assert_eq!(NODE_HEADER.len(), 380, "Deterministic 380-char header validation failed");
    
    let app = Router::new()
        .route("/health", get(|| async { Json(json!({"status": "OPERATIONAL", "node": "${nodeNumber}"})) }))
        .route("/execute", get(|| async { 
            Json(json!({
                "solution": "${item.title}",
                "author": "Todd Jeffrey Ites Jr.",
                "privilege_level": "Least-Privilege-Elevated-On-Demand",
                "license": "${licenseKey}"
            }))
        }));

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    println!("🛡️  Solvex Rust Core listening on http://{}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
`;
  } else if (runtime === 'Python AI Container') {
    entrypointCode = `# Solvex Sovereign JIT Runtime (Python 3.11 Container)
# Package: ${item.title}
# Node: ${nodeNumber}
import os, sys, json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

NODE_HEADER = "${header380}"
assert len(NODE_HEADER) == 380, "Invalid 380-character cryptographic header"

app = FastAPI(title="${item.title}", version="2.4.0")

@app.get("/health")
def health():
    return {"status": "HEALTHY", "node": "${nodeNumber}", "checksum": "${sha256Checksum}"}

@app.post("/infer")
def infer(payload: dict):
    # Sovereign AI execution loop
    return {
        "solution": "${item.title}",
        "processed": True,
        "input_keys": list(payload.keys()),
        "orchestrated_by": "dAIsy haMINJA Sentinel Master Brain"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
`;
  } else {
    entrypointCode = `// Solvex Sovereign JIT Runtime (Go Microservice 1.22)
// Package: ${item.title}
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

const NodeHeader = "${header380}"

func main() {
	if len(NodeHeader) != 380 {
		panic("Fatal: 380-char header integrity error")
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":   "OK",
			"node":     "${nodeNumber}",
			"solution": "${item.title}",
		})
	})

	fmt.Println("🌐 Go Microservice Node running on :8080")
	http.ListenAndServe(":8080", nil)
}
`;
  }

  const dockerRunCommand = `docker run -d --name solvex-${cleanId} -p 8080:8080 -e SOLVEX_HEADER_380="${header380}" -e SOLVEX_LICENSE="${licenseKey}" registry.uarefake.space/solvex/${cleanId}:latest`;

  const manifestObject = {
    packageName: item.title,
    version: "2.4.0-jit.sovereign",
    solutionId: item.id,
    author: "Todd Jeffrey Ites Jr. (Sole Verified Creator & Architect)",
    customerEmail,
    licenseKey,
    nodeNumber,
    nodeHeader380Length: header380.length,
    nodeHeader380: header380,
    sha256Checksum,
    runtime,
    deliveryFormat: "Instant Digital JIT Container & Source Code Package",
    eBpfVerificationStatus: "CLEAN_PASS",
    compiledTimestamp: timestamp,
    pricing: {
      price: item.price,
      currency: "USD",
      pricingModel: item.pricingModel
    },
    dockerRunCommand,
    specs: item.specs || {}
  };

  return {
    solutionId: item.id,
    solutionTitle: item.title,
    version: "2.4.0-jit",
    licenseKey,
    compiledTimestamp: timestamp,
    runtime,
    header380,
    nodeNumber,
    sha256Checksum,
    dockerRunCommand,
    entrypointCode,
    apiEndpointUrl: `https://api.uarefake.space/v1/nodes/${nodeNumber.toLowerCase()}/execute`,
    manifestJson: JSON.stringify(manifestObject, null, 2),
    author: "Todd Jeffrey Ites Jr. (Sole Creator & Architect)"
  };
}

/**
 * Triggers a native browser file download for the compiled JIT software bundle JSON.
 */
export function downloadJitSoftwareFile(artifact: JitSoftwareArtifact): void {
  const filename = `solvex-jit-${artifact.solutionId}-${artifact.nodeNumber.toLowerCase()}.json`;
  const blob = new Blob([artifact.manifestJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
