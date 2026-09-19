import { 
  Plane, 
  Building2, 
  Briefcase, 
  FileText, 
  Landmark, 
  Globe, 
  Zap, 
  Shield, 
  HeartHandshake 
} from 'lucide-react';

const TELEFONE = "5562981559648";
const EMAIL_DESTINO = "moraesluzadvocacia@gmail.com";

/** Link do WhatsApp já com a mensagem preenchida na caixa de texto. */
const whatsapp = (texto: string) =>
  `https://wa.me/${TELEFONE}?text=${encodeURIComponent(texto)}`;

const mailto = (assunto: string, corpo: string) =>
  `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

export const LINKS = {
  WHATSAPP: whatsapp("Olá! Vim pelo site e gostaria de uma orientação jurídica."),
  AGENDA: whatsapp("Olá! Gostaria de agendar um horário com o escritório."),
  INSTAGRAM: "https://www.instagram.com/isabelamoraesluz/",
  MAPS: "https://www.google.com/maps/place/Moraes+Luz+Advocacia/@-16.6394493,-49.2325518,19z/data=!4m10!1m2!2m1!1sEsquina+com+Rua+J60,+Av.+Sucuri+-+St.+Jao,+Goi%C3%A2nia-GO,+74674-260!3m6!1s0x935ef3f2994d01f3:0x9eea480cce786fac!8m2!3d-16.6394493!4d-49.2313609!15sCkFFc3F1aW5hIGNvbSBSdWEgSjYwLCBBdi4gU3VjdXJpIC0gU3QuIEphbywgR29pw6JuaWEtR08sIDc0Njc0LTI2MJIBDmxlZ2FsX3NlcnZpY2Vz4AEA!16s%2Fg%2F11s1rngv0t?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D",
  EMAIL: mailto(
    "Consulta Jurídica - Moraes Luz Advocacia",
    "Olá, gostaria de agendar uma consulta com um especialista da equipe Moraes Luz Advocacia.",
  ),
};

export const VALORES = ["Pontualidade", "Qualidade", "Relacionamento", "Inovação", "Transparência"];

export const DEPOIMENTOS = [
  {
    name: "Monna Digital",
    text: "Serviço prestado com excelência e qualidade. Sempre trazendo melhorias para a empresa."
  },
  {
    name: "TNZ Cleaning Service",
    text: "Obrigado por todo seu apoio e profissionalismo! Seu trabalho foi rápido e tirou uma dor de cabeça de mim."
  },
  {
    name: "CICOPAL Indústria e Comércio",
    text: "Queria agradecer muito o trabalho seu e sua equipe. Foi um ótimo trabalho e melhor ainda que saímos vitoriosos. Sua educação e conhecimento fizeram toda a diferença."
  }
];

export const SERVICOS = [
  {
    icon: Plane,
    title: "Direito Aeronáutico",
    description: "Ênfase no direito do proprietário e/ou operador de aeronave."
  },
  {
    icon: Building2,
    title: "Direito Empresarial",
    description: "Assessoria completa para empresas, garantindo segurança jurídica nos negócios."
  },
  {
    icon: Briefcase,
    title: "Direito Trabalhista",
    description: "Ênfase no direito do empregador, com foco em prevenção e compliance."
  },
  {
    icon: FileText,
    title: "Direito Civil e Contratual",
    description: "Elaboração e revisão de contratos, além de atuação em litígios civis."
  },
  {
    icon: Landmark,
    title: "Direito Tributário",
    description: "Planejamento e defesa tributária para otimização de recursos."
  },
  {
    icon: Globe,
    title: "Direito Contratual Internacional",
    description: "Assessoria contratual especializada em importação de aeronaves."
  }
];

export const DIFERENCIAIS = [
  {
    icon: Zap,
    title: "Sistema de Cadastro Avançado",
    description: "Acesso fácil a relatórios e atualizações em tempo real sobre nosso trabalho, mantendo nossos clientes plenamente informados."
  },
  {
    icon: Shield,
    title: "Foco em Prevenção",
    description: "Não nos limitamos apenas a resolver problemas existentes, mas também capacitamos nossos clientes para evitar obstáculos futuros."
  },
  {
    icon: HeartHandshake,
    title: "Proteção Empresarial e Patrimonial",
    description: "Expertise em proteger a saúde empresarial e o patrimônio de nossos clientes, fornecendo segurança jurídica em todas as interações."
  }
];
