const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Item = require('../models/Item');
const { updateItem, getItems, addItem, deleteItem } = require('../controllers/itemController');
const { expect } = chai;

chai.use(chaiHttp);

describe('Item Controller Tests', () => {
  afterEach(() => {
    sinon.restore(); // Cleanup stubs after each test
  });

  describe('addItem Function Test', () => {
    it('should create a new Item successfully', async () => {
      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: { title: "New Item", description: "Item description", listeddate: "2025-12-31" }
      };

      const createdItem = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };
      const createStub = sinon.stub(Item, 'create').resolves(createdItem);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await addItem(req, res);

      expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdItem)).to.be.true;
    });

    it('should return 500 if an error occurs', async () => {
      const createStub = sinon.stub(Item, 'create').throws(new Error('DB Error'));

      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: { title: "New Item", description: "Item description", deadline: "2025-12-31" }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await addItem(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });

  describe('Update Function Test', () => {
    it('should update Item successfully', async () => {
      const itemId = new mongoose.Types.ObjectId();
      const existingItem = {
        _id: itemId,
        title: "Old Item",
        description: "Old Description",
        instock: true,
        listeddate: new Date(),
        save: sinon.stub().resolvesThis()
      };

      const findByIdStub = sinon.stub(Item, 'findById').resolves(existingItem);

      const req = {
        params: { id: itemId.toString() },
        body: { title: "New Item", completed: true }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await updateItem(req, res);

      expect(existingItem.title).to.equal("New Item");
      expect(existingItem.instock).to.equal(true);
      expect(res.json.calledOnce).to.be.true;
    });

    it('should return 404 if Item is not found', async () => {
      const findByIdStub = sinon.stub(Item, 'findById').resolves(null);

      const req = { params: { id: new mongoose.Types.ObjectId().toString() }, body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await updateItem(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Item not found' })).to.be.true;
    });
    
    it('should return 500 on error', async () => {
      const findByIdStub = sinon.stub(Item, 'findById').throws(new Error('DB Error'));
  
      const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
  
      await updateItem(req, res);
  
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.called).to.be.true;
  
      findByIdStub.restore();
    });
  });

  describe('GetItem Function Test', () => {
    it('should return Items for the given user', async () => {
      const userId = new mongoose.Types.ObjectId();
      const items = [
        { _id: new mongoose.Types.ObjectId(), title: "Item 1", userId },
        { _id: new mongoose.Types.ObjectId(), title: "Item 2", userId }
      ];

      const findStub = sinon.stub(Item, 'find').resolves(items);

      const req = { user: { id: userId } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await getItems(req, res);

      expect(findStub.calledOnceWith({ userId })).to.be.true;
      expect(res.json.calledWith(items)).to.be.true;
    });

    it('should return 500 on error', async () => {
      const findStub = sinon.stub(Item, 'find').throws(new Error('DB Error'));

      const req = { user: { id: new mongoose.Types.ObjectId() } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await getItems(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });

  describe('DeleteItem Function Test', () => {
    it('should delete an Item successfully', async () => {
      const itemId = new mongoose.Types.ObjectId();
      const itemInstance = { _id: itemId, remove: sinon.stub().resolves() };

      const findByIdStub = sinon.stub(Item, 'findById').resolves(itemInstance);

      const req = { params: { id: itemId.toString() } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await deleteItem(req, res);

      expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
      expect(itemInstance.remove.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: 'Item deleted' })).to.be.true;
    });

    it('should return 404 if Item is not found', async () => {
      const findByIdStub = sinon.stub(Item, 'findById').resolves(null);

      const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await deleteItem(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Item not found' })).to.be.true;
    });

    it('should return 500 if an error occurs', async () => {
      const findByIdStub = sinon.stub(Item, 'findById').throws(new Error('DB Error'));

      const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await deleteItem(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });
});
