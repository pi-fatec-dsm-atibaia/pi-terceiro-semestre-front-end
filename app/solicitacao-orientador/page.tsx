import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import FormNoImage from "@/src/components/form-noimage";
import InputCpfCnpj from "@/src/components/inputCpfCnpj";
import InputPeriodoTrabalho from "@/src/components/inputPeriodo";
import InputTelefone from "@/src/components/inputTelefone";
import InputTextForm from "@/src/components/inputTextForm";
import InputWebsite from "@/src/components/inputWebSite";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import ResumoSolicitacao from "@/src/components/resumoSolicit";
import { Title1 } from "@/src/components/titles";

export default function SolicitacaoOrientador() {
  return (
    <div className=" bg-(--c01)">
      <BackgroundGradient>
        <Title1>Formulário de validação CTPS</Title1>
        <FormNoImage>
          <div className="flex">
            <RedMarker />
            <h3 className="font-bold">
              Olá, verifique os dados do aluno e preencha os campos com
              informações sobre a experiencia do aluno
            </h3>
          </div>
          <ResumoSolicitacao
            dataSolicitacao="16/02/2025"
            protocolo="9999.99"
            tipoEquivalencia="CTPS"
            nomeAluno="Marcos da Silva"
            cpf="12345678910"
            status="Aguardando Ass. Empregador"
          />
          <div className="grid lg:grid-cols-3 lg:space-x-[50px]">
            <div className="mt-2.5 space-y-5">
              <div>
                <LabelForm>Nome do empregador:*</LabelForm>
                <InputTextForm
                  id="nomeEmp"
                  placeholder="Informe o nome do empregador"
                />
              </div>
              <div>
                <LabelForm>Rg do empregador:*</LabelForm>
                <InputTextForm
                  id="RgEmp"
                  placeholder="Informe o RG do empregador"
                />
              </div>
              <div>
                <LabelForm>Cargo do empregador:*</LabelForm>
                <InputTextForm
                  id="CargoEmp"
                  placeholder="Informe o Cargo do empregador"
                />
              </div>
              <div>
                <LabelForm>Razão social:*</LabelForm>
                <InputTextForm
                  id="razaoSocial"
                  placeholder="Informe a razão social da empresa"
                />
              </div>
            </div>
            <div className="mt-2.5 space-y-5">
              <div>
                <LabelForm>Telefone da empresa:*</LabelForm>
                <InputTelefone id="TelEmp" />
              </div>
              <div>
                <LabelForm>Site da empresa:</LabelForm>
                <InputWebsite id="SiteEmp" />
              </div>
              <div>
                <LabelForm>Função do aluno:*</LabelForm>
                <InputTextForm
                  id="funcAluno"
                  placeholder="Informe a função do aluno"
                />
              </div>
              <div>
                <LabelForm>Departamento do aluno:*</LabelForm>
                <InputTextForm
                  id="depAluno"
                  placeholder="Informe o departamento do aluno"
                />
              </div>
            </div>
            <div className="mt-2.5 space-y-5">
              <div className="items-center">
                <LabelForm>Periodo de trabalho do aluno:*</LabelForm>
                <InputPeriodoTrabalho
                  startId="dataInicio"
                  endId="dataFim"
                  required
                />
              </div>
              <div>
                <LabelForm>CNPJ:*</LabelForm>
                <InputCpfCnpj
                  id="cnpj"
                  placeholder="Informe o CNPJ da empresa"
                />
              </div>
              <div>
                <LabelForm>Endereço:*</LabelForm>
                <InputTextForm
                  id="endereco"
                  placeholder="Rua Exemplo N-Exemplo"
                />
              </div>
              <div>
                <LabelForm>Bairro:*</LabelForm>
                <InputTextForm id="bairro" placeholder="Bairro Exemplo" />
              </div>
              <div>
                <LabelForm>Cidade:*</LabelForm>
                <InputTextForm id="cidade" placeholder="Cidade Exemplo" />
              </div>
            </div>
          </div>

          <ButtonSubmitForm>Enviar Formulário</ButtonSubmitForm>
        </FormNoImage>
      </BackgroundGradient>
    </div>
  );
}
