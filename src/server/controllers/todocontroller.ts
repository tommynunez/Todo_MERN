import { Request, Response, Router } from 'express';
import TodoService from '../models/TodoService';

const router: Router = Router();
const _todoService = new TodoService();

router.get('/todo', async (_request: Request, _response: Response) => {
	try {
		console.log(_request.query.search);
		const { search, pageIndex } = _request.query;

		const response = await _todoService.getAllDocumentsAsync(
			search,
			pageIndex,
			_request.query.pageSize
		);
		response
			? _response.status(200).json({ response: response, status: 200 })
			: _response.sendStatus(500);
	} catch (error) {
		console.log(error);
	}
});

router.post('/todo', async (_request: Request, _response: Response) => {
	const response = await _todoService.insertDocumentAsync(_request.body);
	response
		? _response.status(201).json({ response: response, status: 201 })
		: _response.sendStatus(500);
});

router.put('/todo/:id', async (_request: Request, _response: Response) => {
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
