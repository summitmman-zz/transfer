import { Component, OnInit } from '@angular/core';
import { AppInterfaces } from '../shared/interfaces/app.interfaces';

@Component({
  selector: 'app-json-view',
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.css']
})
export class JsonViewComponent implements OnInit {

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
                        children: []
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
  public result:string;

  public constructor() { }

  public ngOnInit(): void {
    this.result = JSON.stringify(this.jsonData, null, 2);
  }

}
