import { cac } from 'cac';
import { blue, bold, green, red } from 'kolorist';
import prompts from 'prompts';

const cli = cac('sxo');

cli.command('init [project-name]', 'Initialize a new SXO project').action(async (projectName) => {
    console.log(blue(bold('\n🚀 Welcome to SXO CLI!\n')));

    const response = await prompts([
        {
            type: projectName ? null : 'text',
            name: 'name',
            message: 'Project name:',
            initial: 'my-sxo-project',
        },
        {
            type: 'select',
            name: 'template',
            message: 'Pick a template:',
            choices: [
                { title: 'Vue 3', value: 'vue3' },
                { title: 'Vue 2', value: 'vue2' },
                { title: 'React', value: 'react' },
                { title: 'Solid', value: 'solid' },
            ],
        },
    ]);

    const name = projectName || response.name;
    const template = response.template;

    if (!name || !template) return;

    console.log(green(`\nCreating project ${name} using ${template} template...`));
    // Implementation for template copying would go here
    console.log(green('\n✨ Done!'));
});

cli.command('add <type> [name]', 'Add a theme or component').action(async (type, name) => {
    if (type === 'theme') {
        const themeName =
            name ||
            (
                await prompts({
                    type: 'text',
                    name: 'name',
                    message: 'Theme name:',
                    initial: 'my-theme',
                })
            ).name;

        console.log(blue(`Creating theme ${themeName}...`));
        // Theme generation logic
    } else if (type === 'component') {
        const componentName =
            name ||
            (
                await prompts({
                    type: 'text',
                    name: 'name',
                    message: 'Component name:',
                    initial: 'MyComponent',
                })
            ).name;

        console.log(blue(`Creating component ${componentName}...`));
        // Component generation logic
    } else {
        console.log(red(`Unknown type: ${type}. Use 'theme' or 'component'.`));
    }
});

cli.help();
cli.version('0.1.0');

try {
    cli.parse();
} catch (e: any) {
    console.error(red(e.message));
    process.exit(1);
}
