import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Exits from "@/src/components/exits";
import Form from "@/src/components/form";
import InputEmailForm from "@/src/components/inputEmailForm";
import InputPasswordForm from "@/src/components/inputPasswordForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { Title1 } from "@/src/components/titles";

export default function Login() {
  return (
    <BackgroundGradient>
      <Title1>Login</Title1>
      <Form>
        <div className="flex">
          <RedMarker />
          <h3 className="font-bold">Faça seu Login</h3>
        </div>
        <div className="space-x-3 grid sm:grid-cols-2 gap-3">
          <div>
            <LabelForm>Email:</LabelForm>
            <InputEmailForm id="email" placeholder="Informe o seu e-mail" />
          </div>
          <div>
            <LabelForm>Senha:</LabelForm>
            <InputPasswordForm id="senha" placeholder="Informe a sua senha" />
          </div>
        </div>
        <ButtonSubmitForm>Entrar</ButtonSubmitForm>
        <div>
          <Exits href="/cadastro-conta">Não possui uma conta?</Exits>
          <Exits href="/recuperacao-senha">Esqueci minha senha</Exits>
        </div>
      </Form>
    </BackgroundGradient>
  );
}
