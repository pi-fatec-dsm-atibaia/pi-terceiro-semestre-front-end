import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputEmailForm from "@/src/components/inputEmailForm";
import InputPasswordForm from "@/src/components/inputPasswordForm";
import InputTextForm from "@/src/components/inputTextForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { Title } from "@/src/components/title";

export default function CadastroAdm() {
  return (
    <div className=" bg-(--c01)">
      <BackgroundGradient>
        <Title>Cadastro de Administrador</Title>
        <Form>
          <div className="flex">
            <RedMarker />
            <h3>Dados do Administrador</h3>
          </div>
          <div className="space-x-3 grid sm:grid-cols-2 gap-3">
            <div>
              <LabelForm>Nome:*</LabelForm>
              <InputTextForm
                id="nomeAdm"
                placeholder="Informe o nome do administrador"
              />
            </div>
            <div>
              <LabelForm>Email:*</LabelForm>
              <InputEmailForm
                id="emailAdm"
                placeholder="Informe o email do administrador"
              />
            </div>
          </div>
          <div className="space-x-3 grid sm:grid-cols-2 gap-3">
            <div>
              <LabelForm>Telefone:*</LabelForm>
              <InputTextForm
                id="telefoneAdm"
                placeholder="Informe o telefone do administrador"
              />
            </div>
            <div className="space-y-3 grid">
              <div>
                <LabelForm>Senha:*</LabelForm>
                <InputPasswordForm
                  id="senhaAdm"
                  placeholder="Informe a senha do administrador"
                />
              </div>
              <div>
                <LabelForm>Confirmação de senha:*</LabelForm>
                <InputPasswordForm
                  id="confirm"
                  placeholder="Confirme a senha"
                />
              </div>
            </div>
          </div>
          <ButtonSubmitForm>Cadastrar</ButtonSubmitForm>
        </Form>
      </BackgroundGradient>
    </div>
  );
}
