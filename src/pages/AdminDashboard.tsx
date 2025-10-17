import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Users, ShieldCheck, RefreshCw } from "lucide-react";
import { api, ApiError } from "@/lib/api";

interface AdminUserRow {
  id: string;
  email: string;
  plan: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const planSummary = useMemo(() => {
    const summary: Record<string, number> = {};
    users.forEach((item) => {
      summary[item.plan] = (summary[item.plan] ?? 0) + 1;
    });
    return summary;
  }, [users]);

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate("/admin/login", { replace: true });
    }
  }, [user, navigate]);

  const fetchUsers = async (pageIndex = page) => {
    if (!token) return;\n    setLoading(true);\n    setError(null);\n    try {\n      const response = await api.listAdminUsers(token, pageIndex, pageSize);\n      setUsers(response.items);\n      setPage(response.page);\n      setTotal((response.page - 1) * pageSize + response.items.length);\n    } catch (err) {\n      const apiError = err as ApiError;\n      console.error(err);\n      if (apiError?.status === 403) {\n        setError("Sem permissao de administrador para ver esta secao.");\n        navigate("/admin/login", { replace: true });\n      } else {\n        setError("Nao foi possivel carregar os utilizadores.");\n      }\n    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div className="container mx-auto space-y-8 px-6 py-10">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-display font-semibold">Painel de administrador</h1>
          <p className="text-sm text-muted-foreground">
            Gere utilizadores, subscricoes e monitoriza o uso da NutriFit AI.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-xl" onClick={() => refreshSession()}>
            <RefreshCw className="h-4 w-4" />
            Sincronizar sessao
          </Button>
          <Button className="rounded-xl bg-primary text-primary-foreground hover:shadow-glow" onClick={() => fetchUsers()}>
            Atualizar lista
          </Button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total utilizadores</CardTitle>
              <CardDescription>Contagem atual de contas</CardDescription>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Users className="h-5 w-5" />
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-semibold">{total}</p>
          </CardContent>
        </Card>

        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Distribuicao por plano</CardTitle>
            <CardDescription>Ultima pagina carregada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {Object.entries(planSummary).map(([plan, count]) => (
              <div key={plan} className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2">
                <span className="uppercase tracking-widest">{plan}</span>
                <span className="font-semibold text-foreground">{count}</span>
              </div>
            ))}
            {Object.keys(planSummary).length === 0 && <p>Sem dados suficientes.</p>}
          </CardContent>
        </Card>

        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Estado administrativo</CardTitle>
              <CardDescription>Role atual de {user?.email}</CardDescription>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{user?.isAdmin ? "Acesso administrador ativo" : "Sem acesso"}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Admins conseguem listar utilizadores e gerir planos. Adiciona emails autorizados na configuracao do backend (`ADMIN_EMAILS`).
            </p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border border-border/70 bg-card/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-display">Utilizadores</CardTitle>
            <CardDescription>Resultados paginados ({pageSize} por pagina)</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page === 1 || loading} onClick={() => fetchUsers(page - 1)}>
              Pagina anterior
            </Button>
            <Button variant="outline" disabled={loading} onClick={() => fetchUsers(page + 1)}>
              Pagina seguinte
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <div className="flex h-40 items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              A carregar utilizadores...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Registado em</TableHead>
                  <TableHead className="text-right">ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.email}</TableCell>
                    <TableCell className="uppercase tracking-widest text-muted-foreground">{item.plan}</TableCell>
                    <TableCell>{new Date(item.created_at).toLocaleString("pt-PT")}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">{item.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;






