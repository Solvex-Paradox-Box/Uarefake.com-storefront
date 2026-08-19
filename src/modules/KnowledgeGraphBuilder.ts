import { KnowledgeGraphNode, KnowledgeGraphEdge } from '../types';

/**
 * KnowledgeGraphBuilder.ts
 * Interlinks verified facts and paradox concepts across science, business, law, economics, and conflict resolution.
 */

export class KnowledgeGraphBuilder {
  private nodes: KnowledgeGraphNode[];
  private edges: KnowledgeGraphEdge[];

  constructor() {
    this.nodes = [
      { id: "KGN-01", label: "Quantum Information Theory", domain: "Science & Physics", sourceType: "edu", confidenceScore: 0.99, connectionsCount: 5 },
      { id: "KGN-02", label: "UNCLOS Maritime Sovereignty Code", domain: "International Law", sourceType: "law", confidenceScore: 0.98, connectionsCount: 4 },
      { id: "KGN-03", label: "Macroeconomic Liquidity Paradox", domain: "Economics & Markets", sourceType: "gov", confidenceScore: 0.96, connectionsCount: 6 },
      { id: "KGN-04", label: "Game Theoretic De-Escalation Model", domain: "Conflict Resolution", sourceType: "human_rights", confidenceScore: 0.97, connectionsCount: 5 },
      { id: "KGN-05", label: "Zero-Knowledge Proof Cryptography", domain: "Cybernetics & Math", sourceType: "edu", confidenceScore: 1.00, connectionsCount: 7 },
      { id: "KGN-06", label: "Supply Chain JIT Trade Offs", domain: "Business Strategy", sourceType: "academic_journal", confidenceScore: 0.95, connectionsCount: 4 },
      { id: "KGN-07", label: "Universal Human Rights Declaration", domain: "Human Rights", sourceType: "human_rights", confidenceScore: 1.00, connectionsCount: 8 }
    ];

    this.edges = [
      { id: "KGE-01", sourceId: "KGN-01", targetId: "KGN-05", relationship: "Cryptographic Entanglement Base", weight: 0.95 },
      { id: "KGE-02", sourceId: "KGN-02", targetId: "KGN-04", relationship: "Legal Framework Anchor", weight: 0.92 },
      { id: "KGE-03", sourceId: "KGN-03", targetId: "KGN-06", relationship: "Capital Cost Dynamic", weight: 0.88 },
      { id: "KGE-04", sourceId: "KGN-04", targetId: "KGN-07", relationship: "Mandate Enforcer", weight: 0.98 },
      { id: "KGE-05", sourceId: "KGN-05", targetId: "KGN-06", relationship: "ZK Verification Layer", weight: 0.91 },
      { id: "KGE-06", sourceId: "KGN-02", targetId: "KGN-07", relationship: "Human Rights Binding", weight: 0.96 }
    ];
  }

  public getGraphData(): { nodes: KnowledgeGraphNode[]; edges: KnowledgeGraphEdge[] } {
    return { nodes: this.nodes, edges: this.edges };
  }

  public addNodeAndEdge(label: string, domain: string, relatedNodeId: string, relationship: string): { newNode: KnowledgeGraphNode; newEdge: KnowledgeGraphEdge } {
    const newId = `KGN-${(this.nodes.length + 1).toString().padStart(2, '0')}`;
    const newNode: KnowledgeGraphNode = {
      id: newId,
      label,
      domain,
      sourceType: "edu",
      confidenceScore: 0.97,
      connectionsCount: 1
    };

    const edgeId = `KGE-${(this.edges.length + 1).toString().padStart(2, '0')}`;
    const newEdge: KnowledgeGraphEdge = {
      id: edgeId,
      sourceId: relatedNodeId,
      targetId: newId,
      relationship,
      weight: 0.90
    };

    this.nodes.push(newNode);
    this.edges.push(newEdge);

    return { newNode, newEdge };
  }
}
