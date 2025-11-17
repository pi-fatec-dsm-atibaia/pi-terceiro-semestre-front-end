import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputEmailForm from "@/src/components/inputEmailForm";
import InputPasswordForm from "@/src/components/inputPasswordForm";
import InputTextForm from "@/src/components/inputTextForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { SelectForm } from "@/src/components/selectForm";
import { Title } from "@/src/components/title";

export default function CadastroAluno() {
  return (
    <BackgroundGradient>
      <Title>Cadastro</Title>
      <Form>
        <div className="flex">
          <RedMarker />
          <h3 className="font-bold">Faça seu Cadastro</h3>
        </div>
        <div className="space-x-3 grid sm:grid-cols-3 gap-3">
          <div>
            <LabelForm>Nome:</LabelForm>
            <InputTextForm id="nome" placeholder="Digite seu nome" />
          </div>
          <div>
            <LabelForm>Email:</LabelForm>
            <InputEmailForm id="email" placeholder="Informe o seu e-mail" />
          </div>
          <div>
            <LabelForm>Telefone:</LabelForm>
            <InputTextForm id="telefone" placeholder="Digite seu telefone" />
          </div>
        </div>
        <div className="space-x-3 grid sm:grid-cols-3 gap-3">
          <div>
            <LabelForm>CPF:</LabelForm>
            <InputTextForm id="cpf" placeholder="Digite seu CPF" />
          </div>
          <div>
            <LabelForm>RG:</LabelForm>
            <InputTextForm id="rg" placeholder="Digite seu RG" />
          </div>
          <div>
            <LabelForm>RA:</LabelForm>
            <InputTextForm id="ra" placeholder="Digite seu RA" />
          </div>
        </div>
        <div className="space-x-3 grid sm:grid-cols-3 gap-3">
          <div>
            <LabelForm>Curso:</LabelForm>
            <SelectForm id="curso">
              <option value="" selected disabled>Escolha</option>
              <option value="dsm">DSM</option>
            </SelectForm>
          </div>
          <div>
            <LabelForm>Periodo:</LabelForm>
            <SelectForm id="periodo">
              <option value="" selected disabled>Escolha</option>
              <option value="matutino">Matutino</option>
              <option value="vespertino">Vespertino</option>
              <option value="noturno">Noturno</option>
            </SelectForm>
          </div>
          <div>
            <LabelForm>Semestre:</LabelForm>
            <SelectForm id="semestre">
              <option value="" selected disabled>Escolha</option>
              <option value="1">1° Semestre</option>
              <option value="2">2° Semestre</option>
              <option value="3">3° Semestre</option>
              <option value="4">4° Semestre</option>
              <option value="5">5° Semestre</option>
              <option value="6">6° Semestre</option>
            </SelectForm>
          </div>
        </div>
        <div className="space-x-3 grid sm:grid-cols-2 gap-3">
          <div>
            <LabelForm>Senha:</LabelForm>
            <InputPasswordForm id="senha" placeholder="Digite uma senha" />
          </div>
          <div>
            <LabelForm>Confirme sua senha:</LabelForm>
            <InputPasswordForm id="confirmSenha" placeholder="Confirme a senha digitada" />
          </div>
        </div>

        <ButtonSubmitForm>Cadastrar</ButtonSubmitForm>
      </Form>
    </BackgroundGradient>
  );
}
