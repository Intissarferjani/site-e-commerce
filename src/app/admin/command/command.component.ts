import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/commande.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'] // Importez le fichier CSS ici
})
export class CommandComponent implements OnInit {
  commands: any[] | undefined;
  newCommand: any = {}; // Initialisez newCommand pour éviter les erreurs

  constructor(private commandService: CommandService) { }

  ngOnInit(): void {
    this.commandService.getCommands().subscribe(commands => {
      this.commands = commands;
    });
  }

  addCommand(): void {
    if (this.newCommand && this.newCommand.name && this.newCommand.description && this.newCommand.price) {
      this.commandService.addCommand(this.newCommand)
        .then(() => {
          console.log('Command added successfully!');
          // Réinitialisez les valeurs après l'ajout
          this.newCommand = {};
        })
        .catch(error => {
          console.error('Error adding command: ', error);
        });
    } else {
      console.error('Invalid command data'); // Gérez le cas où les données de la commande sont invalides
    }
  }

  deleteCommand(id: string): void {
    this.commandService.deleteCommand(id)
      .then(() => {
        console.log('Command deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting command: ', error);
      });
  }
}
