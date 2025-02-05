// Generated by https://quicktype.io

export interface TableDatum {
  task: string
  status: Status
  due: null | string
  notes: string
}

export interface Status {
  id: number
  code: string
  name: string
  color: string
}

export interface TableStore {
  statuses: Status[]
  createStatus: (statuses: Status[]) => void
}
