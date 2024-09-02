import { Request, Response, Router } from 'express';
import TodoService from '../models/todo/TodoService';

const router: Router = Router();
const _todoService = new TodoService();

router.get('/todo', async (_request: Request, _response: Response) => {
	try {
		const { search, pageIndex, pageSize } = _request.query;

		const response = await _todoService.getAllDocumentsAsync(
			search,
			pageIndex,
			pageSize
		);
		response
			? _response.status(200).json({ response, status: 200 })
			: _response.sendStatus(500);
	} catch (error) {
		console.log(error);
	}
});

router.get('/todo/:id', async (_request: Request, _response: Response) => {
	const response = await _todoService.getByIdDocumentsAsync(
		_request.params.id?.toString()
	);
	response
		? _response.status(200).json({ response, status: 2000 })
		: _response.sendStatus(500);
});

router.post('/todo', async (_request: Request, _response: Response) => {
	const response = await _todoService.insertDocumentAsync(_request.body.name);
	response
		? _response.status(201).json({ response: response, status: 201 })
		: _response.sendStatus(500);
});

router.put('/todo/:id', async (_request: Request, _response: Response) => {
	console.log('reques!!', import.meta.env);
	const response = await _todoService.updateDocumentAsync(
		_request.body.name,
		_request.body
	);
	response
		? _response.status(200).json({ response: response, status: 200 })
		: _response.sendStatus(500);
});

router.delete('/todo/:id', async (_request: Request, _response: Response) => {
	const response = await _todoService.deleteDocumentAsync(
		parseInt(_request.params.id)
	);
	response
		? _response.status(200).json({ response: response, status: 200 })
		: _response.sendStatus(500);
});

export default router;
