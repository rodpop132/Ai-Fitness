import { useNavigate } from "react-router-dom";
import { LoadingState } from "@/components/LoadingState";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate("/chat");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return <LoadingState message="A preparar o teu espaço saudável..." />;
  }

  return null;
};

export default Index;
