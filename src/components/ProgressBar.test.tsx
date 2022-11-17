import ProgressBar from './ProgressBar';
import { shallow } from 'enzyme';
import { ProgressBarItem } from '../models/ProgressBar.model';

describe.only('ProgressBar', () => {

    test('should display progress with percentage in component.', () => {
        // Given a progress bar object with progress 10
        const progressBarItem: ProgressBarItem = {id: 1, name : '#progress1', progress: 10};
        const progressBarCompoent = shallow(<ProgressBar progressBar= {progressBarItem} />);
        // Expecting the 10% label displayed
        expect(progressBarCompoent.find('.label').text()).toEqual('10%');
    });

    test('should display bar represents the progress value.', () => {
        // Given a progress bar object with progress 10
        const progressBarItem: ProgressBarItem = {id: 1, name : '#progress1', progress: 10};
        const progressBarCompoent = shallow(<ProgressBar progressBar= {progressBarItem} />);
        // Expecting the bar div width to be 10
        expect(progressBarCompoent.find('#bar').prop('style')?.width).toEqual('10%');
    });

    test('bar class should be changed when progress value is over 100.', () => {
        // Given a progress bar object with progress 110
        const progressBarItem: ProgressBarItem = {id: 1, name : '#progress1', progress: 110};
        const progressBarCompoent = shallow(<ProgressBar progressBar= {progressBarItem} />);
        // Expecting the bar div class to have 'danger'
        expect(progressBarCompoent.find('#bar').prop('className')).toContain('danger');
    });

});
