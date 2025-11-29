import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputEmailForm from "@/src/components/inputEmailForm";
import InputPasswordForm from "@/src/components/inputPasswordForm";
import InputTextForm from "@/src/components/inputTextForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { Title } from "@/src/components/title";

export default function CadastroOtr() {
  return (
    <div className=" bg-(--c01)">
      <BackgroundGradient>
        <Title>Cadastro de Orientador</Title>
        <Form>
          <div className="flex">
            <RedMarker />
            <h3>Dados do Orientador</h3>
          </div>
          <div className="space-x-3 grid sm:grid-cols-2 gap-3">
            <div>
              <LabelForm>Nome:*</LabelForm>
              <InputTextForm
                id="nomeOtr"
                placeholder="Informe o nome do orientador"
              />
            </div>
            <div>
              <LabelForm>Email:*</LabelForm>
              <InputEmailForm
                id="emailOtr"
                placeholder="Informe o email do orientador"
              />
            </div>
          </div>
          <div className="space-x-3 grid sm:grid-cols-2 gap-3">
            <div>
              <LabelForm>Cpf:*</LabelForm>
              <InputTextForm
                id="cpfOtr"
                placeholder="Informe o CPF do orientador"
              />
            </div>
            <div className="space-y-3 grid">
              <div>
                <LabelForm>Senha:*</LabelForm>
                <InputPasswordForm
                  id="senhaOtr"
                  placeholder="Informe a senha do orientador"
                />
              </div>
            </div>
          </div>
          <div className="space-x-3 grid sm:grid-cols-2 gap-3">
            <div>
              <LabelForm>Curso Vinculado:*</LabelForm>
              <InputTextForm
                id="cursoOtr"
                placeholder="Informe o curso do orientador"
              />
            </div>
            <div>
              <LabelForm>Confirmação de senha:*</LabelForm>
              <InputPasswordForm id="confirm" placeholder="Confirme a senha" />
            </div>
          </div>

          <ButtonSubmitForm>Cadastrar</ButtonSubmitForm>
        </Form>
      </BackgroundGradient>
    </div>
  );
}
