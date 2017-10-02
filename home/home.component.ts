import { Component,
         OnInit }        from '@angular/core';
import { AppInterfaces } from '../shared/interfaces/app.interfaces';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DependencyTreeComponent } from '../dependency-tree/dependency-tree.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public jsonData = <AppInterfaces.ITreeNode>{
    name: 'Catalog',
    isVisible: true,
    children: <Array<AppInterfaces.ITreeNode>>[
      <AppInterfaces.ITreeNode>{
        name: 'Group 1',
        isVisible: true,
        children: <Array<AppInterfaces.ITreeNode>>[
          <AppInterfaces.ITreeNode>{
            name: 'Category 1',
            isVisible: true,
            children: <Array<AppInterfaces.ITreeNode>>[
              <AppInterfaces.ITreeNode>{
                name: 'Class 1',
                isVisible: true,
                children: <Array<AppInterfaces.ITreeNode>>[
                  <AppInterfaces.ITreeNode>{
                    name: 'Instance 1',
                    isVisible: true,
                    children: <Array<AppInterfaces.ITreeNode>>[
                      <AppInterfaces.ITreeNode>{
                        name: 'Property 1',
                        isVisible: true,
                        children: [
                          <AppInterfaces.ITreeNode>{
                            name: 'sample',
                            isVisible: true,
                            children: []
                          },
                          <AppInterfaces.ITreeNode>{
                            name: 'sample',
                            isVisible: true,
                            children: []
                          },
                          <AppInterfaces.ITreeNode>{
                            name: 'sample',
                            isVisible: true,
                            children: []
                          },
                          <AppInterfaces.ITreeNode>{
                            name: 'sample',
                            isVisible: true,
                            children: []
                          }
                        ]
                      },
                      <AppInterfaces.ITreeNode>{
                        name: 'Property 2',
                        isVisible: true,
                        children: []
                      },
                      <AppInterfaces.ITreeNode>{
                        name: 'Property 3',
                        isVisible: true,
                        children: []
                      },
                      <AppInterfaces.ITreeNode>{
                        name: 'Property 4',
                        isVisible: true,
                        children: []
                      }
                    ]
                  },
                  <AppInterfaces.ITreeNode>{
                    name: 'Instance 2',
                    isVisible: true,
                    children: []
                  },
                  <AppInterfaces.ITreeNode>{
                    name: 'Instance 3',
                    isVisible: true,
                    children: []
                  },
                  <AppInterfaces.ITreeNode>{
                    name: 'Instance 4',
                    isVisible: true,
                    children: []
                  }
                ]
              },
              <AppInterfaces.ITreeNode>{
                name: 'Class 2',
                isVisible: true,
                children: []
              },
              <AppInterfaces.ITreeNode>{
                name: 'Class 3',
                isVisible: true,
                children: []
              },
              <AppInterfaces.ITreeNode>{
                name: 'Class 4',
                isVisible: true,
                children: []
              }
            ]
          },
          <AppInterfaces.ITreeNode>{
            name: 'Category 2',
            isVisible: true,
            children: []
          },
          <AppInterfaces.ITreeNode>{
            name: 'Category 3',
            isVisible: true,
            children: []
          },
          <AppInterfaces.ITreeNode>{
            name: 'Category 4',
            isVisible: true,
            children: []
          }
        ]
      },
      <AppInterfaces.ITreeNode>{
        name: 'Group 2',
        isVisible: true,
        children: []
      },
      <AppInterfaces.ITreeNode>{
        name: 'Group 3',
        isVisible: true,
        children: []
      },
      <AppInterfaces.ITreeNode>{
        name: 'Group 4',
        isVisible: true,
        children: []
      }
    ]
  };

  public constructor(public dialog: MdDialog) { }

  public ngOnInit(): void {
  }

  public openDialog() {
    let dialogRef = this.dialog.open(DependencyTreeComponent, {
      data: this.jsonData,
      width: '1200px'
    })
  }
}
