:

```javascript
import { render, fireEvent } from '@testing-library/react';
import { MyComponent } from './MyComponent'; // Replace with your component path
import { provider } from './providers'; // Replace with your providers path
import { delay } from '../../helpers/delay'; // Replace with your delay helper path (if any)

describe('MyComponent', () => {
  let container;

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterAll(() => {
    document.body.removeChild(container);
  });

  beforeEach(() => {
    container.innerHTML = '';
  });

  test('renders MyComponent', () => {
    render(
      <Provider>
        <MyComponent />
      </Provider>,
      container,
    );

    expect(container).toMatchSnapshot();
  });

  test('calls onMount when mounted', () => {});

  test('calls onUnmount when unmounted', () => {});

  test(`clicks button and calls handleClick`, async () => {
    const handleClick = jest.fn();

    render(
      <Provider>
        <MyComponent onClick={handleClick} />
      </Provider>,
      container,
    );

    fireEvent.click(screen.getByText(/Button Text/i));

    await delay;

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe('with custom props', () --> replace this section if you want to add tests for custom props usage in MyComponent
  
  afterAll(() => {}); --> remove this line if not needed in all tests related to 'MyComponent'
   ...

