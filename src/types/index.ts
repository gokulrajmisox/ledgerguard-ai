export type PriorityLevel = 'P1' | 'P2' | 'P3' | 'P4';
export type CaseStatus = 'investigating' | 'under_review' | 'approved' | 'rejected' | 'escalated' | 'resolved';

export interface Vendor {
  id: string;
  name: string;
  code: string;
  taxId: string;
  bankRouting: string;
  bankAccountMasked: string;
  riskRating: 'low' | 'medium' | 'high' | 'critical';
  historicalVolume: number;
  country: string;
  firstSeen: string;
  verifiedStatus: boolean;
}

export interface LineItem {
  id: string;
  description: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  matchedPoLineId?: string;
  discrepancyFlag?: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorId: string;
  vendorName: string;
  issueDate: string;
  dueDate: string;
  poNumber: string;
  currency: string;
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: 'reconciled' | 'discrepant' | 'investigating' | 'duplicate_suspect';
  lineItems: LineItem[];
  fileUrl: string;
  fileHash: string;
  fileType: 'pdf' | 'png' | 'tiff';
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  vendorName: string;
  issueDate: string;
  authorizedAmount: number;
  currency: string;
  approvedBy: string;
  department: string;
  lineItems: LineItem[];
}

export interface BankTransaction {
  id: string;
  txnReference: string;
  valueDate: string;
  amount: number;
  currency: string;
  remitterName: string;
  beneficiaryName: string;
  beneficiaryAccountMasked: string;
  settlementStatus: 'settled' | 'pending' | 'held';
  matchedInvoiceId?: string;
}

export interface ForensicBoundingBox {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  label: string;
  confidence: number;
  severity: 'low' | 'medium' | 'critical';
  details: string;
}

export interface ForensicFinding {
  id: string;
  region: string;
  type: 'font_raster_anomaly' | 'bounding_box_compression' | 'ocr_layer_mismatch' | 'metadata_timestamp_conflict' | 'duplicate_hash' | 'routing_number_divergence';
  title: string;
  observedEvidence: string;
  technicalDetails: string;
  confidenceScore: number; // e.g. 0.94
  limitationDisclaimer: string;
  status: 'confirmed' | 'disproven' | 'pending_verification';
  boundingBox?: ForensicBoundingBox;
}

export interface InvestigationCase {
  id: string;
  caseNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  vendorName: string;
  vendorId: string;
  priority: PriorityLevel;
  status: CaseStatus;
  detectedAt: string;
  lastUpdated: string;
  amountInDispute: number;
  totalInvoiceAmount: number;
  poAmount: number;
  reconciliationDelta: number;
  summary: string;
  
  // Categorized Evidence
  observedFacts: string[];
  computedDiscrepancies: string[];
  modelInterpretations: string[];
  missingEvidence: string[];
  recommendedAction: string;
  approvalRequirements: string;
  
  forensicFindings: ForensicFinding[];
  assignedAuditor?: string;
}

export interface AuditEvent {
  id: string;
  caseId?: string;
  timestamp: string;
  eventType: 'ingest' | 'reconcile_match' | 'discrepancy_flagged' | 'forensics_scanned' | 'review_action' | 'approval' | 'escalation';
  actor: string;
  actorRole: 'autonomous_agent' | 'human_auditor' | 'system_kernel';
  action: string;
  details: string;
  cryptographicHash: string;
  previousHash: string;
}

export type PipelineStageStatus = 'queued' | 'running' | 'completed' | 'needs_review' | 'failed';

export interface PipelineStage {
  id: string;
  order: number;
  name: string;
  agentName: string;
  status: PipelineStageStatus;
  startedAt?: string;
  completedAt?: string;
  latencyMs: number;
  recordsProcessed: number;
  anomaliesDetected: number;
  description: string;
  inputsSample: Record<string, unknown>;
  outputsSample: Record<string, unknown>;
  logs: string[];
}

export interface BenchmarkMetric {
  metric: string;
  baselineScore: number;
  enhancedScore: number;
  forensicAssistedScore: number;
  unit: string;
  description: string;
  sampleCount: number;
}
