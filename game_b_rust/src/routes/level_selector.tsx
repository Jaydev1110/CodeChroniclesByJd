import {
    Box,
    Text,
    Flex,
    Stack,
    Button,
    SimpleGrid,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useLevels, useSceneNavigator } from "../hooks/scenes_hooks";
import Board from "../components/board/board";
import LevelSelectOption from "../components/level_select_option";
import ObjectiveText from "../components/level/objective_text";
import ChallengeText from "../components/level/challenge_text";
import { Scene } from "../lib/scenes";
import { getBoardDimensions } from "../lib/board_utils";
import { LEVEL_SELECT_OVERLAY_Z_INDEX } from "../lib/constants";

function getMiniObjectiveIcon(scene: Scene) {
    if (scene !== null && scene.completed) {
        return (
            <MdCheckCircle
                size="1.1em"
                color="var(--chakra-colors-green-400)"
                style={{
                    marginRight: "0.2rem",
                    display: "inline",
                    verticalAlign: "middle",
                }}
            />
        );
    }
    return (
        <MdCheckCircleOutline
            size="1.1em"
            color="var(--chakra-colors-gray-400)"
            style={{
                marginRight: "0.2rem",
                display: "inline",
                verticalAlign: "middle",
            }}
        />
    );
}

function getMiniChallengeIcon(scene: Scene) {
    if (scene !== null && scene.challengeCompleted) {
        return (
            <BsStarFill
                size="1.1em"
                color="var(--chakra-colors-yellow-400)"
                style={{
                    marginRight: "0.2rem",
                    display: "inline",
                    verticalAlign: "middle",
                }}
            />
        );
    }
    return (
        <BsStar
            size="1.1em"
            color="var(--chakra-colors-gray-400)"
            style={{
                marginRight: "0.2rem",
                display: "inline",
                verticalAlign: "middle",
            }}
        />
    );
}

export default function LevelSelector() {
    const LEVELS = useLevels();
    const { navigateToScene } = useSceneNavigator();
    const [selectedScene, setSelectedScene] = useState<Scene>(LEVELS[0]);

    const levelPreviewScale = 0.86;
    const boardDims = useMemo(() => getBoardDimensions(levelPreviewScale), []);

    return (
        <Flex h="100vh" bg="gray.900" color="white">
            {/* Level List */}
            <Stack borderRight="1px solid black" w="400px" flexShrink={0} bg="gray.800">
                <Box p="6px" pt="16px">
                    <Text
                        fontSize="24px"
                        fontWeight="bold"
                        mt="2px"
                        mb="2px"
                        align="center"
                    >
                        Code Chronicles Levels
                    </Text>
                </Box>
                <Box
                    overflowY="auto"
                    className="dark-scrollbar scrollbar-left"
                    h="100%"
                    w="100%"
                    p="6px"
                >
                    {LEVELS.map((scene) => (
                        <Box key={scene.name}>
                            <LevelSelectOption
                                scene={scene}
                                isLocked={!scene.unlocked}
                                isActive={scene.level === selectedScene.level}
                                onClick={() => {
                                    if (scene.unlocked) {
                                        setSelectedScene(scene);
                                    }
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Stack>

            {/* Level Preview */}
            <Stack p="32px" w="100%" align="center" justify="center">
                <Box
                    id="level-select-preview-outer-wrapper"
                    overflow="hidden"
                    position="relative"
                    w={`${boardDims.innerWidth}px`}
                    h={`${boardDims.innerHeight}px`}
                    borderRadius="lg"
                    boxShadow="2xl"
                >
                    <Box
                        id="level-select-preview-inner-wrapper"
                        zIndex={LEVEL_SELECT_OVERLAY_Z_INDEX}
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        boxShadow="inset 0 0 10px 10px rgba(0, 0, 0, 0.5)"
                        pointerEvents="none"
                    />
                    <Board
                        gameState={selectedScene.level!.initial_state}
                        enableAnimations={false}
                        enableHoverInfo={false}
                        scale={levelPreviewScale}
                        filter="saturate(0.4) sepia(0.8) hue-rotate(175deg) brightness(0.8)"
                        showDecoration={false}
                        levelStyle="gray"
                    />
                </Box>

                <Box mt={8} textAlign="center" maxW="800px">
                    <Text fontSize="32px" fontWeight="bold" mb={4}>
                        Level {selectedScene?.levelIndex || 0}: {selectedScene.level?.name}
                    </Text>

                    <Box fontSize="18px" mb={8}>
                        <Text as="span" verticalAlign="middle">
                            {getMiniObjectiveIcon(selectedScene)}
                            <Text as="span" verticalAlign="middle" fontWeight="bold">
                                Objective:
                            </Text>{" "}
                            <ObjectiveText text={selectedScene?.level?.objective || ""} />
                        </Text>

                        {selectedScene?.level?.challenge !== "" && (
                            <>
                                <br />
                                <Text as="span" verticalAlign="middle" mt={2} display="inline-block">
                                    {getMiniChallengeIcon(selectedScene)}
                                    <Text as="span" verticalAlign="middle" fontWeight="bold">
                                        Challenge:
                                    </Text>{" "}
                                    <ChallengeText text={selectedScene?.level?.challenge || ""} />
                                </Text>
                            </>
                        )}
                    </Box>

                    <Button
                        size="lg"
                        colorScheme="blue"
                        fontSize="24px"
                        px={12}
                        py={8}
                        onClick={() => navigateToScene(selectedScene)}
                    >
                        Play Level
                    </Button>
                </Box>
            </Stack>
        </Flex>
    );
}
