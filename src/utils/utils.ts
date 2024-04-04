export const maskCPF = (event: any) => {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };
  
export const maskDate = (event: any) => {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{4})\d+?$/, "$1");
  };

  export const validationRules = {
    required: (value: any) => !!value || "Campo obrigatório.",
    minName: (v: any) => v.length >= 3 || "Mínimo de 3 caracteres",
    email: (v: any) => /.+@.+\..+/.test(v) || "Email inválido",
    cpf: (v: any) => /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(v) || "CPF inválido",
    date: (v: any) => /\d{2}\/\d{2}\/\d{4}/.test(v) || "Data inválida",
    minPassword: (v: any) => v.length >= 8 || "Mínimo de 8 caracteres",
    passwordMatch: (v: any, userPassword: any) => v === userPassword ? true : "Senhas não coincidem",
};
