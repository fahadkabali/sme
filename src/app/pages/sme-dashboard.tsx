// pages/sme-dashboard.tsx
import { withAuth } from "../components/withAuth"

interface SMEDashboardProps {
  // Add any props your component needs
}

function SMEDashboard(props: SMEDashboardProps) {
  return <h1>SME Dashboard</h1>
}

export default withAuth<SMEDashboardProps>(SMEDashboard, ["SME"])