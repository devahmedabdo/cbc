import { Component, ElementRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommentService } from './comment.service';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  services = inject(CommentService);
  cbc: any = {
    Anemia: 'Normal',
    MCV: 'Normal',
    MCH: 'Normal',
    WBCs: 'Normal',
    RDW: 'Normal',
    Neutrophils: 'Normal',
    Monocytes: 'Normal',
    Lymphocytes: 'Normal',
    Eosinophils: 'Normal',
    PLT: 'Normal',
  };

  year: number = new Date().getFullYear();
  labels: any[] = [
    {
      name: 'Anemia',
      values: ['Normal', 'Mild-Low', 'Moderate-Low', 'Marked-Low'],
    },
    {
      name: 'MCV',
      values: ['Normal', 'Low', 'High'],
    },
    {
      name: 'MCH',
      values: ['Normal', 'Low', 'High'],
    },
    {
      name: 'RDW',
      values: ['Normal', 'Low', 'High'],
      sep: true,
    },
    {
      name: 'WBCs',
      values: [
        'Marked-Low',
        'Moderate-Low',
        'Mild-Low',
        'Normal',
        'Mild-High',
        'Moderate-High',
        'Marked-High',
      ],
    },
    {
      name: 'Neutrophils',
      values: ['Normal', 'Low', 'High'],
    },
    {
      name: 'Lymphocytes',
      values: ['Normal', 'Low', 'High'],
    },
    {
      name: 'Monocytes',
      values: ['Normal', 'High'],
    },
    {
      name: 'Eosinophils',
      values: ['Normal', 'High'],
      sep: true,
    },
    {
      name: 'PLT',
      values: [
        'Marked-Low',
        'Moderate-Low',
        'Mild-Low',
        'Normal',
        'Mild-High',
        'Moderate-High',
        'Marked-High',
      ],
    },
  ];
  normal: string = '';
  mcv: any = {
    Normal: 'Normocytic',
    Low: 'Micromocytic',
    High: 'Macromocytic',
  };
  wbcs: any = {
    Low: 'leucopenia',
    High: 'leucocytosis',
  };
  mch: any = {
    Normal: 'Normochromic',
    Low: 'hypochromic',
    High: 'hyperchromic',
  };
  neutrophils: any = {
    Normal: '',
    Low: 'neutropenia',
    High: 'neutrophilia',
  };
  lymphocytes: any = {
    Normal: '',
    Low: 'lymphopenia',
    High: 'lymphocytosis',
  };
  monocytes: any = {
    Normal: '',
    High: 'monocytosis',
  };
  eosinophils: any = {
    Normal: '',
    High: 'eosinophilia',
  };
  plt: any = {
    Low: 'thrombocytopenia',
    High: 'thrombocytosis',
  };
  patientComment: any = {
    anemia: null,
    wbcs: null,
    plt: null,
  };
  comment: any = {
    anemia: '',
    wbcs: '',
    plt: '',
  };
  generate(cbc: any, ele?: ElementRef) {
    this.normal = '';
    this.patientComment = {
      anemia: null,
      wbcs: null,
      plt: null,
    };
    this.comment = {
      anemia: '',
      wbcs: '',
      plt: '',
    };

    if (cbc.Anemia != 'Normal') {
      this.comment.anemia += `* RBCs Show  ${cbc.Anemia} ${this.mcv[cbc.MCV]} ${
        this.mch[cbc.MCH]
      } anemia`;
      this.patientComment.anemia =
        this.services.anemiaCauses[
          this.getLower(cbc.MCV) +
            this.getLower(cbc.MCH) +
            this.getLower(cbc.RDW)
        ];
    }

    if (cbc.PLT != 'Normal') {
      this.comment.plt += `* PLTs Show ${cbc.PLT.slice(
        0,
        cbc.PLT.indexOf('-')
      )} ${this.plt[cbc.PLT.slice(cbc.PLT.indexOf('-') + 1)]}`;

      this.patientComment.plt =
        this.services.pltCases[
          this.getLower(cbc.PLT) +
            this.getLower(cbc.WBCs) +
            this.getLower(cbc.Anemia)
        ];
    }
    if (
      this.isUbnnormal(
        'WBCs',
        'Neutrophils',
        'Lymphocytes',
        'Monocytes',
        'Eosinophils'
      )
    ) {
      this.patientComment.wbcs =
        this.services.wbcCases[
          this.getLower(cbc.WBCs) +
            this.getLower(cbc.Neutrophils) +
            this.getLower(cbc.Lymphocytes) +
            this.getLower(cbc.Monocytes) +
            this.getLower(cbc.Eosinophils)
        ];
      this.comment.wbcs += `* WBCs Show `;
      if (cbc.WBCs != 'Normal') {
        this.comment.wbcs += `total ${
          this.wbcs[cbc.WBCs.slice(cbc.WBCs.indexOf('-') + 1)]
        } ${
          this.isUbnnormal(
            'Neutrophils',
            'Lymphocytes',
            'Monocytes',
            'Eosinophils'
          )
            ? cbc.WBCs.slice(cbc.WBCs.indexOf('-') + 1) == 'Low'
              ? 'and absolute'
              : 'and relative'
            : ''
        }`;
      }
      this.comment.wbcs += ` ${this.lymphocytes[cbc.Lymphocytes]} ${
        this.neutrophils[cbc.Neutrophils]
      } ${this.monocytes[cbc.Monocytes]} ${this.eosinophils[cbc.Eosinophils]}
        `;
    }
    document.getElementById('comment')?.scrollIntoView({
      behavior: 'smooth',
    });
    let comment_value: string[] = Object.values(this.comment);
    if (comment_value.every((e) => e == '')) {
      this.comment.anemia =
        'BLOOD PICTURE IS WITHIN NORMAL RANGE FOR AGE & SEX';
      this.normal = 'صورة الدم ضمن النطاق الطبيعي للعمر والجنس ';
    }
  }

  copy() {
    navigator.clipboard.writeText(this.comment.anemia+'\n' + this.comment.wbcs +'\n'+this.comment.plt);
    Swal.fire({
      icon: 'success',
      title: 'Coppied',
      toast: true,
      timer: 1500,
      position: 'top-end',
      showConfirmButton: false,
    });
  }

  isUbnnormal(...str: string[]) {
    for (let i = 0; i < str.length; i++) {
      if (this.cbc[str[i]] !== 'Normal') return true;
    }
    return false;
  }

  getLower(value: string): string {
    let _value: string = value.includes('-')
      ? value.slice(value.indexOf('-') + 1)
      : value;
    return _value.toLowerCase();
  }
}
