import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  cbc: any = {
    Anemia: 'Normal',
    MCV: 'Normal',
    MCH: 'Normal',
    WBCs: 'Normal',
    Neutrophils: 'Normal',
    Monocytes: 'Normal',
    Eosinophils: 'Normal',
    PLT: 'Normal',
  };

  labels: any[] = [
    {
      name: 'Anemia',
      values: ['Normal', 'Mild', 'Moderate', 'Marked'],
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
      name: 'WBCs',
      values: [
        'Mild-Low',
        'Moderate-Low',
        'Marked-Low',
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
    },
    {
      name: 'PLT',
      values: [
        'Mild-Low',
        'Moderate-Low',
        'Marked-Low',
        'Normal',
        'Mild-High',
        'Moderate-High',
        'Marked-High',
      ],
    },
  ];
  comment: string = '';
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
  generate(cbc: any) {
    let anemiaComment: string = '';
    let pltComment: string = '';
    let wbcsComment: string = '';

    if (cbc.Anemia != 'Normal') {
      anemiaComment += `* RBCs Show  ${cbc.Anemia} ${this.mcv[cbc.MCV]} ${
        this.mch[cbc.MCH]
      } anemia`;
    }

    if (cbc.PLT != 'Normal') {
      pltComment += `* PLTs Show ${cbc.PLT.slice(0, cbc.PLT.indexOf('-'))} ${
        this.plt[cbc.PLT.slice(cbc.PLT.indexOf('-') + 1)]
      }`;
    }

    if (
      cbc.WBCs != 'Normal' ||
      cbc.Neutrophils != 'Normal' ||
      cbc.Monocytes != 'Normal' ||
      cbc.WBCs != 'Normal' ||
      cbc.Eosinophils != 'Normal'
    ) {
      wbcsComment += `* WBCs Show `;
      //
      if (cbc.WBCs != 'Normal') {
        wbcsComment += `total ${
          this.wbcs[cbc.WBCs.slice(cbc.WBCs.indexOf('-') + 1)]
        } and `;
      } else {
        wbcsComment += `
        ${this.lymphocytes[cbc.Lymphocytes]}
        ${this.neutrophils[cbc.Neutrophils]}
        ${this.neutrophils[cbc.Monocytes]}
        ${this.neutrophils[cbc.Eosinophils]}
        `;
      }

      // pltComment += `* PLTs Show ${cbc.PLT} ${this.plt[cbc.MCV]} ${
      //   this.mch[cbc.MCH]
      // } anemia`;
    }
    // cbc: any = {

    //   WBCs: 'Normal',
    //   Neutrophils: 'Normal',
    //   Neutrophils: 'Normal',
    //   Monocytes: 'Normal',
    //   Eosinophils: 'Normal',
    // };

    // if (cbc.PLT != 'Normal') {
    //   wbcsComment += `PLTs Show ${cbc.PLT} ${this.plt[cbc.MCV]} ${
    //     this.mch[cbc.MCH]
    //   } anemia`;
    // }
    this.comment = `${anemiaComment}\n${pltComment}\n${wbcsComment}`;
  }
  copy() {
    navigator.clipboard.writeText(this.comment);
    Swal.fire({
      icon: 'success',
      title: 'Coppied',
      toast: true,
      timer: 1500,
      position: 'top-end',
      showConfirmButton: false,
    });
    // setTimeout(() => {
    //   Swal.close();
    // }, 1000);
  }
}

// Yes, you can get a general idea of the type of anemia using MCV (Mean Corpuscular Volume) and MCH (Mean Corpuscular Hemoglobin), but adding RDW-CV (Red Cell Distribution Width - Coefficient of Variation) provides more diagnostic accuracy. Here’s why:

// 1. MCV & MCH Alone
// Low MCV + Low MCH → Microcytic, hypochromic anemia (e.g., Iron Deficiency Anemia, Thalassemia)
// Normal MCV + Normal MCH → Normocytic anemia (e.g., Anemia of Chronic Disease, Early Iron Deficiency)
// High MCV + High MCH → Macrocytic anemia (e.g., Vitamin B12 or Folate Deficiency, Liver Disease)
// 2. Why RDW-CV Matters?
// High RDW + Low MCV → Suggests Iron Deficiency Anemia (more variation in RBC sizes)
// Normal RDW + Low MCV → Suggests Thalassemia (cells are uniformly small)
// High RDW + Normal MCV → Suggests Early Nutritional Deficiency (Iron, B12, or Folate Deficiency)
// High RDW + High MCV → Suggests Megaloblastic Anemia (B12/Folate Deficiency)
// Conclusion
// While MCV & MCH provide a strong starting point, RDW-CV helps differentiate between causes of similar MCV values (e.g., Iron Deficiency vs. Thalassemia). If available, ferritin, iron studies, and reticulocyte count should be checked for a more precise diagnosis.

// Would you like help integrating this into your CBC comment generator? 😊

// A low RDW (Red Cell Distribution Width) is not typically clinically significant, but in some cases, it suggests that the red blood cells are very uniform in size. Here’s how it relates to anemia classification:

// 1. Low RDW + Low MCV (Microcytic Anemia)
// Possible Cause: Thalassemia Trait (Minor)
// Thalassemia results in uniformly small RBCs, leading to low RDW and low MCV.
// Iron Deficiency Anemia, in contrast, usually has high RDW due to increased variation in RBC sizes.
// 2. Low RDW + Normal MCV (Normocytic Anemia)
// Possible Cause: Anemia of Chronic Disease (ACD)
// Conditions like chronic kidney disease, infections, or autoimmune diseases can cause anemia with uniform RBC sizes (low RDW).
// 3. Low RDW + High MCV (Macrocytic Anemia)
// Rare Case: This is uncommon, as most macrocytic anemias (B12/Folate deficiency) increase RDW due to variation in RBC sizes.
// If present, it may suggest a more uniform bone marrow suppression pattern, such as aplastic anemia.
