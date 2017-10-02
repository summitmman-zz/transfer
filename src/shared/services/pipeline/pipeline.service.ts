import { Injectable } from '@angular/core';
import { AppEnums } from '../../enums/app.enums';

@Injectable()
export class PipelineService {

  private _iconDictionary = [
    {
      key: AppEnums.ProcessType.Code,
      value: ['program-code.png', 'Code']
    },
    {
      key: AppEnums.ProcessType.Batch,
      value: ['program-batch.png', 'Batch']
    },
    {
      key: AppEnums.ProcessType.Email,
      value: ['program-email.png', 'Email']
    },
    {
      key: AppEnums.ProcessType.FileWatcher,
      value: ['program-filewatcher.png', 'File Watcher']
    },
    {
      key: AppEnums.ProcessType.Logger,
      value: ['program-logger.png', 'Logger']
    },
    {
      key: AppEnums.ProcessType.ProcessGroup,
      value: ['program-processgroup.png', 'Process Group']
    },
    {
      key: AppEnums.ProcessType.Sql,
      value: ['program-sql.png', 'SQL Process']
    }
  ];

  constructor() { }

  public getIcon(type: AppEnums.ProcessType) {
    return this._iconDictionary.find(x => x.key === type).value[0];
  }
  public getDesc(type: AppEnums.ProcessType) {
    return this._iconDictionary.find(x => x.key === type).value[1];
  }

}
