export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'Open' | 'Investigating' | 'Contained' | 'Resolved';
export type IncidentType =
  'Malware' | 'Phishing' | 'Brute Force' | 'DDoS' | 'Unauthorized Access' | 'Data Exfiltration';

export interface SecurityIncident {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  sourceIp: string;
  sourceCountry: string;
  target: string;
  status: IncidentStatus;
  analyst: string;
  timestamp: string;
}

export function incidentSeverityColor(severity: IncidentSeverity) {
  const map: Record<IncidentSeverity, string> = {
    Critical: 'negative',
    High: 'warning',
    Medium: 'primary',
    Low: 'grey-6',
  };
  return map[severity];
}

export function incidentStatusColor(status: IncidentStatus) {
  const map: Record<IncidentStatus, string> = {
    Open: 'negative',
    Investigating: 'warning',
    Contained: 'primary',
    Resolved: 'positive',
  };
  return map[status];
}

export function incidentTypeIcon(type: IncidentType) {
  const map: Record<IncidentType, string> = {
    Malware: 'bug_report',
    Phishing: 'phishing',
    'Brute Force': 'lock_open',
    DDoS: 'bolt',
    'Unauthorized Access': 'no_encryption',
    'Data Exfiltration': 'cloud_upload',
  };
  return map[type];
}

// Placeholder data — wire this up to a real SIEM/EDR API when available.
export const incidents: SecurityIncident[] = [
  {
    id: 'INC-2201',
    type: 'Brute Force',
    severity: 'Critical',
    sourceIp: '185.220.101.42',
    sourceCountry: 'Russia',
    target: 'auth.api.internal',
    status: 'Open',
    analyst: 'You',
    timestamp: '4 min ago',
  },
  {
    id: 'INC-2200',
    type: 'Phishing',
    severity: 'High',
    sourceIp: '45.146.164.8',
    sourceCountry: 'Ukraine',
    target: 'finance@company.com',
    status: 'Investigating',
    analyst: 'Sara',
    timestamp: '22 min ago',
  },
  {
    id: 'INC-2198',
    type: 'DDoS',
    severity: 'High',
    sourceIp: '103.87.60.5',
    sourceCountry: 'Vietnam',
    target: 'edge-lb-03',
    status: 'Contained',
    analyst: 'You',
    timestamp: '1 h ago',
  },
  {
    id: 'INC-2195',
    type: 'Malware',
    severity: 'Critical',
    sourceIp: '91.243.85.19',
    sourceCountry: 'Iran',
    target: 'workstation-devops-04',
    status: 'Investigating',
    analyst: 'Sara',
    timestamp: '2 h ago',
  },
  {
    id: 'INC-2190',
    type: 'Unauthorized Access',
    severity: 'Medium',
    sourceIp: '198.51.100.23',
    sourceCountry: 'Nigeria',
    target: 'staging.dashboard.internal',
    status: 'Resolved',
    analyst: 'You',
    timestamp: '5 h ago',
  },
  {
    id: 'INC-2184',
    type: 'Data Exfiltration',
    severity: 'Critical',
    sourceIp: '218.92.0.171',
    sourceCountry: 'China',
    target: 'billing-db-primary',
    status: 'Contained',
    analyst: 'Sara',
    timestamp: 'Yesterday',
  },
  {
    id: 'INC-2179',
    type: 'Brute Force',
    severity: 'Medium',
    sourceIp: '203.0.113.77',
    sourceCountry: 'Brazil',
    target: 'vpn-gateway-02',
    status: 'Resolved',
    analyst: 'You',
    timestamp: 'Yesterday',
  },
  {
    id: 'INC-2170',
    type: 'Phishing',
    severity: 'Low',
    sourceIp: '192.0.2.14',
    sourceCountry: 'USA',
    target: 'hr@company.com',
    status: 'Resolved',
    analyst: 'Sara',
    timestamp: '2 d ago',
  },
];
