import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment as env } from '../../../../environments/environment';
import { Tarefa, TAREFA_NULL } from '../../../dtos/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './consulta-tarefas.component.html',
  styleUrl: './consulta-tarefas.component.css'
})
export class ConsultaTarefasComponent {

  // Injeções
  ngHttp = inject(HttpClient);
  fb = inject(FormBuilder);

  // Atributos da classe
  form = this.fb.group({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required]),
  });

  resp: { total: number; tarefas: Tarefa[] } = {
    total: 0,
    tarefas: [],
  }

  tarefaSelected = TAREFA_NULL;

  consultarTarefas() {
    const {dataMin, dataMax} = {...this.form.value};
    const self = this;

    this.ngHttp.get(`${env.BASE_API_URL}/tarefas/${dataMin}/${dataMax}`)
      .subscribe({
        next(body) {
          let tarefas = body as Tarefa[];
          self.resp = {
            total: tarefas.length,
            tarefas
          }          
        },
        error(err) {
          
        },
      });
  }

  onSelected(tarefa: Tarefa) {
    this.tarefaSelected = tarefa;
  }

  excluirTarefa(tarefa_id: string) {
    const self = this;

    this.ngHttp.delete(`${env.BASE_API_URL}/tarefas/${tarefa_id}`)
      .subscribe({
        next(_) {
          self.resp.tarefas = self.resp.tarefas.filter(tarefa => tarefa.id != tarefa_id);
          self.resp.total--;
          self.tarefaSelected = TAREFA_NULL;
        },
        error(err) {
          alert(`Erro ao excluir tarefa ${tarefa_id}`);
          console.error(err);
        },
      });
  }

  cleanTable() {
    this.form.reset();
    this.resp = {tarefas: [], total: 0};
  }

}
