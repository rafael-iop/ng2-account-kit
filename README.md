# Angular 2 Facebook Account Kit
Angular 2 TypeScript Wrapper for Facebook Account Kit SDK

## Installation
- Install via NPM:
```
npm i --save-dev ng2-account-kit
```

- Add the Account Kit for Web (JavaScript) to your index.html
```
<script src="https://sdk.accountkit.com/en_US/sdk.js"></script>
```

## Example Usage
```typescript
import { AccountKit, AuthResponse } from 'ng2-account-kit';

@Component({
  templateUrl: '/path/to/template.html'
})
export class MyComponent {
  constructor() { }

  ngOnInit() {
    AccountKit.init({
      appId: '{{FACEBOOK_APP_ID}}',
      state: '{{csrf}}',
      version: '{{ACCOUNT_KIT_API_VERSION}}'
    })
  }

  login(): void {
    AccountKit.login('PHONE', { countryCode: '+55', phoneNumber: '12345678' }).then(
      (response: AuthResponse) => console.log(response),
      (error: any) => console.error(error)
    );
  }

}
```
