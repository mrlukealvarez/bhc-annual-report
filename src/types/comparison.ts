export interface ComparisonDataPoint {
  metric: string;
  bhcValue: string;
  competitorValue: string;
  winner: "bhc" | "competitor" | "equal";
  note?: string;
}

export interface ComparisonData {
  competitorName: string;
  competitorType: string;
  dataPoints: ComparisonDataPoint[];
  summary: string;
}
