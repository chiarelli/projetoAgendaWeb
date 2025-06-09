import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment as env } from '../../../../environments/environment';
import { Categoria, Tarefa } from '../../../dtos/interfaces';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent {
  // Injeções
  ngHttp = inject(HttpClient);
  fb = inject(FormBuilder);

  // Atributos de classe
  categorias: Categoria[] = [];
  mensagem: string = '';

  form = this.fb.group({
    titulo: new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(150)
    ]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    finalizado: new FormControl(undefined, [Validators.required]),
    categoria_id: new FormControl('', [Validators.required]),
  });

  // Métodos e handlers
  ngOnInit() {
    this.ngHttp.get(`${env.BASE_API_URL}/categorias`)
      .subscribe(data => {
        this.categorias = data as Categoria[];
      })
  }

  onSubmit() {
    const payload = {...this.form.value};
    const self = this;
    // console.log(payload);
    this.ngHttp.post(`${env.BASE_API_URL}/tarefas`, payload)
    .subscribe({
      next(value: any) {
        const tarefa = value as Tarefa
        self.mensagem = `Tarefa ${tarefa.titulo}, cadastrada com sucesso!`;
        self.form.reset();
      },
      error(err) {
        console.error(err)        
      },
    })
  }

}
