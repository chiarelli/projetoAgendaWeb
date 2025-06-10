import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria, Tarefa, TAREFA_NULL, TarefaUpdate } from '../../../dtos/interfaces';
import { environment as env } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edicao-tarefas.component.html',
  styleUrl: './edicao-tarefas.component.css'
})
export class EdicaoTarefasComponent {

  // Injeções
  ngHttp = inject(HttpClient);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  // Atributos de classe
  categorias: Categoria[] = [];
  mensagem: string = '';
  tarefa: Tarefa = TAREFA_NULL;

  form = this.fb.group({
      titulo: new FormControl,
      data: new FormControl,
      hora: new FormControl,
      finalizado: new FormControl,
      categoria_id: new FormControl,
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {        
        return alert("Guid da tarefa vazio");
      }

      Promise.all([this.getCategorias(), this.getTarefa(id)])
        .then(() => this.renderForm());
    });
  }


  atualizarTarefaSubmit() {
    const self = this;
    const formData = this.form.value;

    const payload: TarefaUpdate = {
      titulo: formData.titulo,
      data: formData.data,
      hora: formData.hora,
      finalizado: formData.finalizado,
      categoria_id: formData.categoria_id
    };

    // console.log("Payload a ser enviado:", payload);
    this.ngHttp.put(`${env.BASE_API_URL}/tarefas/${self.tarefa.id}`, payload)
      .subscribe({
        next(data: any) {
          const TarefaUpdated = data as Tarefa;
          self.tarefa = TarefaUpdated;
          self.mensagem = 'Tarefa atualizada com sucesso';
          // console.log("Data recebida:", TarefaUpdated);
        },
        error(err) {
          alert('Erro ao atualizar tarefa');
          console.error(err);
        },
      });
  }

  async getCategorias() {
    const self = this;

    return new Promise((resolve, reject) => {

      this.ngHttp.get(`${env.BASE_API_URL}/categorias`)
        .subscribe({
          next(data) {
            self.categorias = data as Categoria[];
            resolve(self.categorias);
          },
          error(err) {
            alert('Erro ao buscar categorias');
            console.error(err);
            reject(err);
          },
        });

    });

  }
    
  async getTarefa(id: string) {
    const self = this;

    return new Promise((resolve, reject) => {
      
      this.ngHttp.get(`${env.BASE_API_URL}/tarefas/${id}`)
          .subscribe({
            next(value: any) {
              const tarefa = value as Tarefa;
              console.log(tarefa);
              
              self.tarefa = tarefa;            
              resolve(self.tarefa);
            },
            error(err) {
              alert(`Erro ao buscar tarefa ${id}`);
              console.error(err);
              reject(err);
            },
          });  
          
    });


  }

  renderForm() {
    this.form = this.fb.group({
      titulo: new FormControl(this.tarefa.titulo, [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(150)
      ]),
      data: new FormControl(this.tarefa.data, [Validators.required]),
      hora: new FormControl(this.tarefa.hora, [Validators.required]),
      finalizado: new FormControl(this.tarefa.finalizado, [Validators.required]),
      categoria_id: new FormControl(this.tarefa.categoria.id, [Validators.required]),
    });
  }

}
