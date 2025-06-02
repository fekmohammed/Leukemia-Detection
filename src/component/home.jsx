import { Card, CardContent } from "../components/ui/card";

const Dashboard = () => {
  const recentUsers = [
    { name: "Alice", date: "2025-05-26" },
    { name: "Bob", date: "2025-05-25" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-primary mb-6">Recent Tests</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {recentUsers.map((user, i) => (
          <Card key={i} className="shadow-xl hover:shadow-2xl transition">
            <CardContent className="p-4">
              <div className="font-medium text-lg">{user.name}</div>
              <div className="text-muted-foreground text-sm">{user.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
