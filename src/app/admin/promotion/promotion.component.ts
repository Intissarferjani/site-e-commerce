import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  newPromotionForm: any = {}; // Formulaire d'ajout
  updatePromotionForms: any = {}; // Tableau des formulaires de mise à jour
  promotions: any[] = []; // Liste des promotions

  constructor(private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions(): void {
    this.promotionService.getPromotions().subscribe(
      (promotions: any[]) => {
        this.promotions = promotions;
        // Initialiser les formulaires de mise à jour pour chaque promotion
        this.updatePromotionForms = promotions.map(promotion => ({ ...promotion }));
      },
      (error: any) => {
        console.error('Error getting promotions:', error);
      }
    );
  }

  addPromotion(): void {
    this.promotionService.addPromotion(this.newPromotionForm).subscribe(
      (ref: any) => {
        console.log('Promotion added successfully:', ref);
        // Réinitialiser le formulaire ici si nécessaire
        this.newPromotionForm = {}; // Réinitialiser le formulaire après l'ajout
        // Actualiser la liste des promotions après l'ajout
        this.getPromotions();
      },
      (error: any) => {
        console.error('Error adding promotion:', error);
      }
    );
  }

  updatePromotion(key: string, updates: any): void {
    this.promotionService.updatePromotion(key, updates).subscribe(
      () => {
        console.log('Promotion updated successfully');
        // Actualiser la liste des promotions après la mise à jour
        this.getPromotions();
      },
      (error: any) => {
        console.error('Error updating promotion:', error);
      }
    );
  }

  deletePromotion(key: string): void {
    this.promotionService.deletePromotion(key).subscribe(
      () => {
        console.log('Promotion deleted successfully');
        // Actualiser la liste des promotions après la suppression
        this.getPromotions();
      },
      (error: any) => {
        console.error('Error deleting promotion:', error);
      }
    );
  }



  toggleEditMode(promotion: any): void {
    promotion.editMode = !promotion.editMode;

    // Créer un nouveau formulaire de mise à jour pour la promotion si nécessaire
    if (!promotion.editMode) {
        this.updatePromotionForms[promotion.key] = { ...promotion };
    }
}

}
