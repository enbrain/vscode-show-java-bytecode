import * as vscode from 'vscode';
import FileJavaBytecodeContentProvider from './FileJavaBytecodeContentProvider';
import JdtJavaBytecodeContentProvider from './JdtJavaBytecodeContentProvider';

export function activate(context: vscode.ExtensionContext) {
	const dumperUri = vscode.Uri.joinPath(context.extensionUri, 'java-bytecode-dumper-0.1.0.jar');

	const fileJavaBytecodeProvider = new FileJavaBytecodeContentProvider(dumperUri);
	const jdtJavaBytecodeProvider = new JdtJavaBytecodeContentProvider(dumperUri);

	context.subscriptions.push(
		vscode.workspace.registerTextDocumentContentProvider('file-java-bytecode', fileJavaBytecodeProvider),
		vscode.workspace.registerTextDocumentContentProvider('jdt-java-bytecode', jdtJavaBytecodeProvider),
		vscode.commands.registerCommand('show-java-bytecode.showBytecode', async (fileUri: vscode.Uri) => {
			const bytecodeUri = fileUri.with({ scheme: `${fileUri.scheme}-java-bytecode` });
			await vscode.window.showTextDocument(bytecodeUri, { viewColumn: vscode.ViewColumn.Beside });
		})
	);
}

export function deactivate() { }
