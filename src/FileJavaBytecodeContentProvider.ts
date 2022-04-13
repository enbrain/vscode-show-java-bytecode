import * as vscode from 'vscode';
import JavaBytecodeContentProvider from './JavaBytecodeContentProvider';

export default class FileJavaBytecodeContentProvider extends JavaBytecodeContentProvider {
    getArgs(uri: vscode.Uri): string[] {
        return ['file', uri.fsPath];
    }
}
