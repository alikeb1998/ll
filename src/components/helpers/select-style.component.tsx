import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Slider from 'rc-slider';
import styled, {css} from 'styled-components';
import {Button} from '..';
import {Font, Moon, Sun} from '../../assets';
import {RootState} from '../../store';
import {Color, FontFamily, Themes} from '../../store/settings/types';
import {setFontFamily, setFontSize, setTheme} from '../../store/settings/actions';
import 'rc-slider/assets/index.css';

const Container = styled.div`
  position: relative;
`;

const OpenButtonContainer = styled.div`
  width: 160px;
  position: relative;
`;

interface OpenButtonProps {
	shadow: boolean;
	background: Color;
}

const OpenButton = styled.div<OpenButtonProps>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 336ms;
  background: ${({background}) => background};
  position: absolute;
  right: 0;
  z-index: 1;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  ${({shadow}) => shadow && css`
    box-shadow: 0 3px 20px 0 #00000029;
  `}
`;

const PanelContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
`;

interface PanelProps {
	background: Color;
	color: Color;
	shadow: boolean;
	active: boolean;
}

const Panel = styled.div<PanelProps>`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 160px;
  position: relative;
  padding: 15px;
  margin-top: 15px;
  background: ${({background}) => background};
  border-radius: 10px;
  transition: all 336ms;
  top: ${({active}) => active ? '0' : '-400px'};
  color: ${({color}) => color};

  &:after, &:before {
    content: '';
    display: block;
    position: absolute;
    bottom: 100%;
    width: 0;
    height: 0;
  }

  &:before {
    left: 129px;
    border: 11px solid transparent;
    border-bottom-color: ${({background}) => background};
  }

  &:after {
    left: 130px;
    border: 10px solid transparent;
    border-bottom-color: ${({background}) => background};
  }

  ${({shadow}) => shadow && css`
    box-shadow: 0 10px 30px 0 #00000029;
  `}
`;

interface SliderContainerProps {
	primary: Color;
	accent: Color;
}

const SliderContainer = styled.div<SliderContainerProps>`
  & .rc-slider-rail {
    background-color: ${({primary}) => primary};
  }

  & .rc-slider-track {
    background-color: ${({accent}) => accent};
  }

  & .rc-slider-handle {
    border-color: ${({accent}) => accent};
  }

  & .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: ${({accent}) => accent};
  }

  & .rc-slider-handle-click-focused:focus {
    border-color: ${({accent}) => accent};
  }

  & .rc-slider-handle:hover {
    border-color: ${({accent}) => accent};
  }

  & .rc-slider-handle:active {
    border-color: ${({accent}) => accent};
    box-shadow: 0 0 5px ${({accent}) => accent};
  }
`;

const ThemeButton = styled(OpenButton)`
  align-self: center;
  position: inherit;
`;

export const SelectStyle = () => {
	const dispatch = useDispatch();
	const {
		theme: {shadow, secondaryBackground, primary, accent, foreground},
		fontSize,
		fontFamily,
	} = useSelector(({settings}: RootState) => settings);

	const [isOpen, setOpen] = useState(false);

	const onOpenButtonClick = () => () => setOpen(isOpen => !isOpen);
	const onFontSizeSliderChange = () => (fontSize: number) => dispatch(setFontSize(fontSize));
	const onFontFamilyClick = (fontFamily: FontFamily) => () => dispatch(setFontFamily(fontFamily));
	const onThemeClick = () => () => dispatch(setTheme(shadow ? Themes.dark : Themes.light));

	return (
		<Container>
			<OpenButtonContainer>
				<OpenButton shadow={shadow} background={secondaryBackground} onClick={onOpenButtonClick()}>
					<Font />
				</OpenButton>
			</OpenButtonContainer>
			<PanelContainer>
				<Panel background={secondaryBackground} shadow={shadow} active={isOpen} color={foreground}>
					<div>Font Size</div>
					<SliderContainer primary={primary} accent={accent}>
						<Slider min={-3} max={3} step={1} value={fontSize} onChange={onFontSizeSliderChange()} />
					</SliderContainer>
					<div>Font Family</div>
					<Button primary={fontFamily !== FontFamily.QUICKSAND} fill
									color={fontFamily === FontFamily.QUICKSAND ? Color.WHITE : undefined}
									onClick={onFontFamilyClick(FontFamily.QUICKSAND)} fontFamily={FontFamily.QUICKSAND}>Quicksand</Button>
					<Button primary={fontFamily !== FontFamily.PT_SANS} fill
									color={fontFamily === FontFamily.PT_SANS ? Color.WHITE : foreground}
									onClick={onFontFamilyClick(FontFamily.PT_SANS)} fontFamily={FontFamily.PT_SANS}>PT Sans</Button>
					<Button primary={fontFamily !== FontFamily.PT_SERIF} fill
									color={fontFamily === FontFamily.PT_SERIF ? Color.WHITE : foreground}
									onClick={onFontFamilyClick(FontFamily.PT_SERIF)} fontFamily={FontFamily.PT_SERIF}>PT Serif</Button>
					<ThemeButton shadow={false} background={primary} onClick={onThemeClick()}>
						{
							shadow ?
								<Sun /> :
								<Moon />
						}
					</ThemeButton>
				</Panel>
			</PanelContainer>
		</Container>
	);
};
