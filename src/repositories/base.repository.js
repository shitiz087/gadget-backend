class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async create(data) {
    return this.model.create(data);
  }

  async updateById(id, data) {
    const record = await this.findById(id);
    if (!record) return null;
    await record.update(data);
    return record;
  }

  async deleteById(id) {
    const record = await this.findById(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }

  async findOne(where) {
    return this.model.findOne({ where });
  }

  async findByIds(idList) {
    return this.model.findAll({ where: { id: idList } });
  }
}

module.exports = BaseRepository;
