import * as vscode from 'vscode';
import JavaBytecodeContentProvider from './JavaBytecodeContentProvider';

export default class JdtJavaBytecodeContentProvider extends JavaBytecodeContentProvider {
    getArgs(uri: vscode.Uri): string[] {
        return ['jdt', uri.query];
    }
}
