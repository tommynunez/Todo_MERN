/*import mongoose from 'mongoose';
import { choreListModel, insertDocumentAsync, updateDocumentAsync, deleteDocumentAsync, getDocumentbyIdAsync, getDocumentsAsync } from '../models/choreListModel';
import { IChoreListAdd, IChoreListUpdate } from '../interfaces/choreListInterfaces';

jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue({}),
    disconnect: jest.fn().mockResolvedValue(undefined),
  };
});

jest.mock('../models/choreListModel', () => {
  const originalModule = jest.requireActual('../models/choreListModel');
  return {
    ...originalModule,
    choreListModel: {
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findOneAndDelete: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      prototype: {
        save: jest.fn()
      }
    }
  };
});

describe('ChoreList Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insertDocumentAsync', () => {
    it('should insert a new document and return true', async () => {
      const mockData: IChoreListAdd = {
        title: 'Groceries',
        owner: new mongoose.Types.ObjectId(),
        shareWith: [],
        createdDate: new Date()
      };

      const saveMock = jest.fn().mockResolvedValue(true);
      (choreListModel as any).mockImplementation(() => ({ save: saveMock }));

      const result = await insertDocumentAsync(mockData);
      expect(result).toBe(true);
      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('updateDocumentAsync', () => {
    it('should update a document and return true', async () => {
      const updateMock = jest.fn().mockResolvedValue(true);
      (choreListModel.findByIdAndUpdate as jest.Mock).mockImplementation(updateMock);

      const result = await updateDocumentAsync('123', {
        title: 'Updated',
        shareWith: [],
        updatedDate: new Date()
      } as IChoreListUpdate);

      expect(result).toBe(true);
      expect(updateMock).toHaveBeenCalled();
    });
  });

  describe('deleteDocumentAsync', () => {
    it('should delete a document and return true', async () => {
      const deleteMock = jest.fn().mockResolvedValue(true);
      (choreListModel.findOneAndDelete as jest.Mock).mockImplementation(deleteMock);

      const result = await deleteDocumentAsync('123');
      expect(result).toBe(true);
      expect(deleteMock).toHaveBeenCalledWith({ id: '123' });
    });
  });

  describe('getDocumentbyIdAsync', () => {
    it('should return a document by id', async () => {
      const mockDoc = { _id: '123', title: 'Test' };
      (choreListModel.findById as jest.Mock).mockResolvedValue(mockDoc);

      const result = await getDocumentbyIdAsync('123');
      expect(result).toEqual(mockDoc);
      expect(choreListModel.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('getDocumentsAsync', () => {
    it('should return a list of documents with pagination and search', async () => {
      const mockDocs = [{ title: 'Test' }];
      const execMock = jest.fn().mockResolvedValue(mockDocs);
      const skipMock = jest.fn().mockReturnValue({ limit: jest.fn().mockReturnValue({ exec: execMock }) });
      const findMock = jest.fn().mockReturnValue({ skip: skipMock });

      (choreListModel.find as jest.Mock).mockImplementation(findMock);

      const result = await getDocumentsAsync('ownerId', 'Test', 0, 10);
      expect(result).toEqual(mockDocs);
      expect(findMock).toHaveBeenCalledWith({
        title: { $regex: 'Test', $options: 'i' },
        owner: 'ownerId'
      });
    });
  });
});
/*