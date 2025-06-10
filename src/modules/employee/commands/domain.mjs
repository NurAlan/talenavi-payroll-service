import db from '../../../models/index.mjs'
import { NotFoundError } from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import _ from 'lodash'

export default class Employee {
  constructor () {
    this.command = new Command(db)
  }

  async create(payload) {
    
  }
}

