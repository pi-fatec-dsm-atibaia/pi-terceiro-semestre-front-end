import BackgroundGradient from "@/src/components/backgroundGradient";
import { ButtonSubmitForm } from "@/src/components/buttonSubmitForm";
import Form from "@/src/components/form";
import InputNumberForm from "@/src/components/inputNumberForm";
import InputTextForm from "@/src/components/inputTextForm";
import { LabelForm } from "@/src/components/labelForm";
import RedMarker from "@/src/components/redMarker";
import { SelectForm } from "@/src/components/selectForm";
import { Title1 } from "@/src/components/titles";
import { error } from "console";

export default function CadastroCurso() {
  return (
    <div className=" bg-(--c01)">
      <BackgroundGradient>
        <Title1>Cadastro de Curso</Title1>
        <Form>
          <div className="flex">
            <RedMarker />
            <h3 className="font-bold">Dados do curso</h3>
          </div>
          <div className="space-x-3 grid sm:grid-cols-2 gap-3">
            <div>
              <LabelForm>Nome:*</LabelForm>
              <InputTextForm id="nome" placeholder="Informe o nome do curso" />
            </div>
            <div>
              <LabelForm>Código:*</LabelForm>
              <InputTextForm
                id="codigo"
                placeholder="Informe o código abreviado"
              />
            </div>
          </div>

          <LabelForm>Periodo:*</LabelForm>
          <SelectForm id="periodo">
            <option value="">--Selecione uma opção--</option>
            <option value="matutino">Matutino</option>
            <option value="vespertino">Vespertino</option>
            <option value="noturno">Noturno</option>
          </SelectForm>

          <LabelForm>Semestres:*</LabelForm>
          <InputNumberForm
            id="semestres"
            placeholder="Informe quantos semestres tem o curso"
          />
          <ButtonSubmitForm>Cadastrar Curso</ButtonSubmitForm>
        </Form>
      </BackgroundGradient>
    </div>
  );
}
