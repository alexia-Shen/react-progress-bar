import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';
import { Form } from 'react-bootstrap';
import ProgressBarComponent from './components/ProgressBar';

describe('App', () => {
    let appComponent: ShallowWrapper;

    beforeEach(() => appComponent = shallow(<App />));

    test('should render header', () => {
        const header = appComponent.find('h2');
        expect(header.length).toEqual(1);
        expect(header.text()).toEqual('Progress Bars Demo');
    });

    test('should render all buttons', () => {
        const buttons = appComponent.find('Button');
        expect(buttons.length).toEqual(4);
        expect(buttons.at(0).text()).toEqual('-25');
        expect(buttons.at(1).text()).toEqual('-10');
        expect(buttons.at(2).text()).toEqual('+10');
        expect(buttons.at(3).text()).toEqual('+25');
    });

    test('should render all progress bar', () => {
        const progressBars = appComponent.find(ProgressBarComponent);
        expect(progressBars.length).toEqual(3);
    });

    test('should update selected progress bar after dropdown click.', () => {
        let dropdownComponent = appComponent.find(Form.Select);
        // By default it is selecting first item
        expect(dropdownComponent.props().value).toEqual(0);
        dropdownComponent.simulate('change', {
            target: { value: 1 }
        });
        // After selecting it is selecting first item
        dropdownComponent = appComponent.find(Form.Select);
        expect(dropdownComponent.props().value).toEqual(1);
    });

    test('should update progress on selected progress bar by button click.', () => {
        const dropdownComponent = appComponent.find(Form.Select);
        let progressBarComponents = appComponent.find(ProgressBarComponent);
        // By default it is selecting first item
        expect(dropdownComponent.props().value).toEqual(0);
        // Expecting progress bars rendered with default values
        expect(progressBarComponents.at(0).prop('progressBar').progress).toEqual(10);
        expect(progressBarComponents.at(1).prop('progressBar').progress).toEqual(40);
        expect(progressBarComponents.at(2).prop('progressBar').progress).toEqual(60);
        // Click on + 10 button
        const plus10ButtonComponent = appComponent.findWhere((wrapper) => wrapper.text() === '+10').filter('Button');
        plus10ButtonComponent.simulate('click');
        // Expecting only first progress bar changed progress
        progressBarComponents = appComponent.find(ProgressBarComponent);
        expect(progressBarComponents.at(0).prop('progressBar').progress).toEqual(20);
        expect(progressBarComponents.at(1).prop('progressBar').progress).toEqual(40);
        expect(progressBarComponents.at(2).prop('progressBar').progress).toEqual(60);
    });

    test('should progress cannot go below 0.', () => {
        const dropdownComponent = appComponent.find(Form.Select);
        let progressBarComponents = appComponent.find(ProgressBarComponent);
        // By default it is selecting first item
        expect(dropdownComponent.props().value).toEqual(0);
        // Expecting progress bars rendered with default values
        expect(progressBarComponents.at(0).prop('progressBar').progress).toEqual(10);
        // Click on -25 button
        const minus25ButtonComponent = appComponent.findWhere((wrapper) => wrapper.text() === '-25').filter('Button');
        minus25ButtonComponent.simulate('click');
        // Expecting only first progress bar changed progress
        progressBarComponents = appComponent.find(ProgressBarComponent);
        expect(progressBarComponents.at(0).prop('progressBar').progress).toEqual(0);
    });

});
