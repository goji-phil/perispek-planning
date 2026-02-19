// src/types/index.ts
// Single source of truth for all data shapes used throughout the app.

export type AssetType = 'pipe' | 'manhole' | 'storm-drain'

/**
 * NASSCO condition grade:
 * 1 = Minor defect — no immediate action
 * 2 = Moderate defect — monitor
 * 3 = Significant defect — plan rehabilitation
 * 4 = Severe defect — prioritize rehabilitation
 * 5 = Critical defect — immediate action required
 */
export type ConditionGrade = 1 | 2 | 3 | 4 | 5

/**
 * Risk band derived from risk score.
 *
 * Risk Score = (CoF × LoF) / 2, where CoF and LoF are each on a 0.0–5.0 scale.
 * Maximum risk score = (5.0 × 5.0) / 2 = 12.5
 *
 * Band thresholds:
 *   [0, 3)   → low
 *   [3, 6)   → medium
 *   [6, 9)   → high
 *   [9, 12.5] → critical
 */
export type RiskBand = 'low' | 'medium' | 'high' | 'critical'

export type WorkOrderStatus = 'open' | 'in-progress' | 'completed'

export type WorkOrderType = 'inspection' | 'repair' | 'rehabilitation' | 'emergency'

export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'critical'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface InspectionRecord {
  id: string
  /** ISO date string e.g. '2024-08-15' */
  date: string
  grade: ConditionGrade
  /** NASSCO PACP/MACP codes e.g. ['BC', 'CC'] */
  defectCodes: string[]
  notes: string
  linearFeetInspected: number
}

export interface PACPData {
  /** Current/latest condition grade (1–5) */
  grade: ConditionGrade
  /** Active defect codes from most recent inspection */
  defectCodes: string[]
  /** 2–3 historical inspection records, most recent first */
  inspectionHistory: InspectionRecord[]
}

export interface IoTReading {
  /** ISO datetime e.g. '2025-11-15T14:00:00Z' */
  timestamp: string
  /**
   * Depth-to-diameter ratio (0.0–1.0+).
   * Values > 1.0 indicate overflow (pipe capacity exceeded).
   */
  dRatio: number
  /** Million gallons per day */
  flowRateMGD: number
}

export interface IoTData {
  enabled: true
  /**
   * Current d/D ratio (depth/diameter).
   * Values > 1.0 indicate overflow (pipe capacity exceeded).
   */
  currentDRatio: number
  /** Current flow rate in million gallons per day */
  flowRateMGD: number
  /**
   * Per-asset warning threshold (0.6–0.85).
   * Asset is "in warning" when currentDRatio >= warningThreshold.
   * Asset is "in overflow" when currentDRatio > 1.0.
   */
  warningThreshold: number
  /** 90 days of daily readings, oldest first */
  timeSeries: IoTReading[]
}

export interface Asset {
  /** e.g. 'pipe-001', 'mh-012', 'sd-003' */
  id: string
  type: AssetType
  /** Human-readable, location-based e.g. 'Main St Trunk Line' */
  name: string
  /** Real KC coordinates */
  coordinates: GeoPoint
  material: 'Concrete' | 'Clay' | 'PVC' | 'Cast Iron' | 'HDPE' | 'Brick'
  /** Pipe/manhole diameter in inches */
  diameterInches: number
  installYear: number
  /** NASSCO PACP data for pipes, MACP data for manholes (uses same structure) */
  pacp: PACPData
  /**
   * Consequence of Failure (0.0–5.0 scale).
   * Reflects impact of failure: population served, proximity to waterways, etc.
   */
  cof: number
  /**
   * Likelihood of Failure (0.0–5.0 scale).
   * Derived from PACP grade and asset age.
   */
  lof: number
  /**
   * Risk Score = (CoF × LoF) / 2
   * Range: 0.0–12.5
   * Bands: [0–3) = low, [3–6) = medium, [6–9) = high, [9–12.5] = critical
   */
  riskScore: number
  riskBand: RiskBand
  /** Present only if asset has IoT sensors installed */
  iot?: IoTData
  /** Upstream connected asset IDs (for pipe network topology) */
  upstreamConnections?: string[]
  /** Downstream connected asset IDs */
  downstreamConnections?: string[]
}

export interface WorkOrder {
  id: string
  assetId: string
  type: WorkOrderType
  priority: WorkOrderPriority
  status: WorkOrderStatus
  title: string
  description: string
  /** Inspector/crew name */
  assignedTo?: string
  /** ISO datetime */
  createdAt: string
  /** ISO date */
  dueDate: string
  /** ISO datetime; present only when status='completed' */
  completedAt?: string
}

export interface InspectionCoveragePeriod {
  /**
   * Period identifier:
   * 'YYYY-Www' for weekly (e.g. '2025-W42')
   * 'YYYY-MM' for monthly (e.g. '2025-10')
   * 'YYYY-Qn' for quarterly (e.g. '2025-Q3')
   */
  period: string
  linearFeetInspected: number
  /** Consent decree target for this period */
  targetLinearFeet: number
  /** true when inspected >= target */
  onTrack: boolean
}

export interface InspectionCoverage {
  /** Last 12 weeks */
  weekly: InspectionCoveragePeriod[]
  /** Last 12 months */
  monthly: InspectionCoveragePeriod[]
  /** Last 4 quarters */
  quarterly: InspectionCoveragePeriod[]
}
