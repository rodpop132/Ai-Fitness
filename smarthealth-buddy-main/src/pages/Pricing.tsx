import { PricingCard } from "@/components/pricing/PricingCard";
import { Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Para experimentares o poder da IA",
      features: [
        "10 mensagens por dia",
        "3 análises de imagem por dia",
        "Chat básico com IA",
        "Histórico limitado (7 dias)",
        "Suporte por email",
      ],
      buttonText: "Plano Atual",
    },
    {
      name: "Pro",
      price: "9.99",
      description: "Para quem leva a sério a sua saúde",
      features: [
        "200 mensagens por dia",
        "30 análises de imagem por dia",
        "Exportar planos em PDF",
        "Histórico completo",
        "Prioridade nas respostas",
        "Planos semanais automáticos",
        "Suporte prioritário",
      ],
      highlighted: true,
      buttonText: "Começar Agora",
    },
    {
      name: "Elite",
      price: "19.99",
      description: "Coaching completo e personalizado",
      features: [
        "Mensagens ilimitadas",
        "Análises de imagem ilimitadas",
        "Tudo do Pro +",
        "Coach de metas avançado",
        "Macro cycle de treino",
        "Análise de progresso semanal",
        "Consultoria 1-1 mensal",
        "Acesso antecipado a features",
      ],
      buttonText: "Começar Agora",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-display font-bold">NutriFit AI</h1>
          </div>
          
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-display font-bold mb-4">
            Escolhe o plano perfeito para ti
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todos os planos incluem acesso à IA de nutrição e treino. 
            Faz upgrade a qualquer momento para desbloquear mais features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 animate-slide-up">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              onSelect={() => console.log(`Selected ${plan.name}`)}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
          <h3 className="text-2xl font-display font-bold text-center mb-8">
            Perguntas Frequentes
          </h3>
          
          <div className="space-y-4">
            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-semibold mb-2">Quando renovam os limites diários?</h4>
              <p className="text-sm text-muted-foreground">
                Os limites diários renovam às 00:00 (meia-noite) no teu fuso horário local.
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-semibold mb-2">Posso mudar de plano a qualquer momento?</h4>
              <p className="text-sm text-muted-foreground">
                Sim! Podes fazer upgrade ou downgrade do teu plano a qualquer momento. 
                As alterações entram em vigor imediatamente.
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-semibold mb-2">A análise de imagens é precisa?</h4>
              <p className="text-sm text-muted-foreground">
                Utilizamos IA avançada para analisar as tuas imagens, mas as estimativas 
                nutricionais são aproximadas. Para informação médica precisa, consulta sempre 
                um profissional de saúde.
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-semibold mb-2">Os meus dados estão seguros?</h4>
              <p className="text-sm text-muted-foreground">
                Levamos a privacidade muito a sério. As tuas conversas e imagens são 
                armazenadas de forma segura e nunca são partilhadas sem o teu consentimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
