import { ApolloDriver } from '@nestjs/apollo';
import { join } from "path";
import { DirectiveLocation, GraphQLDirective } from 'graphql/index';

export const GraphqlConfig = {
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    installSubscriptionHandlers: true,
    formatError: (error: any) => {
        switch (true) {
            case error.message === 'Validation error' : return error.extensions.exception.errors.map(item => item.message)
            default: return error;
        }
    },
    buildSchemaOptions: {
        directives: [
            new GraphQLDirective({
                name: 'upper',
                locations: [DirectiveLocation.FIELD_DEFINITION],
            }),
        ],
    },
}
